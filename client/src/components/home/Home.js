import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import sportImage from '../../img/sport.png';
import sportsImage from '../../img/sports.gif';

class Home extends Component{
  render(){
      return(
          <div>
            <header className="jumbotron bg-primary mb-0">
          		<div className="container">
          			<h1 className="text-center">Welcome to FindSport2Play</h1>
          			<img className="img-fluid" id="imageSize" src={sportImage} alt="Sport" />
          		</div>
          	</header>
          	
          	<Link to="/events" className="btn btn-lg text-white bg-info">List of Events</Link>
          	<Link to="/register" className="btn btn-lg text-white bg-info">Sign Up</Link>
          	<Link to="/login" className="btn btn-lg text-white bg-info">Login</Link>
          	
            <div className="jumbotron bg-light mb-0">
        		  <div className="container">
        			  <div className="row">
        				  <div className="col-md-5">
        					  <img className="img-fluid rounded-circle float-right" src={sportsImage} alt="Sports"/>
        				  </div>
        				  <div className="col-md-7">
        					  <h1 className="text-center">Start Finding Your Match!</h1>
        				  </div>
        			  </div>
        		  </div>
        	  </div>
        	</div>
      );
  }
}

export default Home;