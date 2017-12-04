import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from '../authorization/auth';
import Places from "./Places";
import PlacesHome from "./PlacesHome";

class TopMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.isloggedIn,
      userName: auth.userName,
      isUser: auth.isUser,
      isAdmin: auth.isAdmin
    }
  }

  loginStatus = (status, userName, isUser, isAdmin) => {
    this.setState({ loggedIn: status, userName, isUser, isAdmin });
  }

  componentDidMount() {
    auth.setLoginObserver(this.loginStatus);
  }



  render() {
    const logInStatus = this.state.loggedIn ? "Logged in as: " + this.state.userName : "";
    return (

      <div>
        <nav className="navbar navbar-default" style={{ background: "pink" }} >
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/" style={{ pointerEvents: "none", color: "orange" }}>Semester project</a>
            </div>
            <ul className="nav navbar-nav">

              {this.state.loggedIn && (<li><Link to="/Places">See locations</Link></li>)}
              {!this.state.loggedIn && (<li><Link to="/">See locations</Link></li>)}
              {!this.state.loggedIn && (<li><Link to="/register">Register User</Link></li>)}
              {this.state.isAdmin && (<li><Link to="/admin">Page for Admins</Link></li>)}
              {this.state.isAdmin && (<li><Link to="/users">See all users</Link></li>)}
              {this.state.loggedIn && (<li><Link to="/bookings">Bookings</Link></li>)}
              <li><Link to="/houses">all houses</Link></li>

            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="navbar-text" style={{ color: "steelBlue" }}>{logInStatus}</li>
              <li>
                {this.state.loggedIn ?
                  (
                    <Link to="/logout">
                      <span className="glyphicon glyphicon-log-in"></span> Logout</Link>
                  ) :
                  (
                    <Link to="/login">
                      <span className="glyphicon glyphicon-log-out"></span> Login </Link>
                  )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default TopMenu;