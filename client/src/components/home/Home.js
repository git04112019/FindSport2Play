import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Home.module.css';
import LandingImg from '../../img/landingImg.png';
import HowitworkImg1 from '../../img/howitworkImg1.png';
import HowitworkImg2 from '../../img/howitworkImg2.png';

class Home extends Component{
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render(){
      const { isAuthenticated } = this.props.auth;
      const {
        header,
        header__text,
        header__buttons,
        header__img,
        howItWork,
        howItWork__container,
        howItWork__text,
        howItWork__imgReverse } = styles;
      
      const guestLinks = (
        <div className={header__buttons}>
      		<Link to="/register" className="btn btn-lg text-white btn-primary mr-4">Get Started</Link>
      		<Link to="/events" className="btn btn-lg text-white bg-info">See Events</Link>
      	</div>
      );
      
      const userLinks = (
        <div className={header__buttons}>
      		<Link to="/profile" className="btn btn-lg text-white btn-primary mr-4">Go to Your Profile</Link>
          <Link to="/events" className="btn btn-lg text-white bg-info">See Events</Link>
      	</div>
      );

      return(
        <div>
          <header className={header}>
            <div className={header__text}>
              <h1>Search for players to play sport</h1>
              <p>Pick a day, time, and place to play any sports with someone or group of people</p>
              {isAuthenticated ? userLinks : guestLinks}
            </div>
            <img src={LandingImg} alt="Landing" className={header__img}/>
          </header>
          
          <main>
            <div className={howItWork}>
              <div className={howItWork__container}>
                <img src={HowitworkImg1} alt="HowitworkImg1" />
                <div className={howItWork__text}>
                  <h2>Search for Event</h2>
                  <p>You can find any sport event that was post by player to join</p>
                </div>
              </div>
              
              <div className={howItWork__container}>
                <img src={HowitworkImg2} className={howItWork__imgReverse} alt="HowitworkImg2" />
                <div className={howItWork__text}>
                  <h2>Create an Event</h2>
                  <p>You can create event so that any player to join you to play together</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);