const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validation/profile');

router.get('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
        .populate('user', ['name'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);
    
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const profileFields = {};
    profileFields.user = req.user.id;
    
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    
    if(typeof req.body.favoriteSport !== 'undefined'){
        profileFields.favoriteSport = req.body.favoriteSport.split(',');
    }
    
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            ).then(profile => res.json(profile));
        }
        else{
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if(profile){
                    res.status(400).json({errors: 'That handle already exists'});
                }
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
});

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'This user does not exist';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => 
            res.status(404).json({profile: 'There is no profile for this user'})
        );
});

module.exports = router;