const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
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

module.exports = router;