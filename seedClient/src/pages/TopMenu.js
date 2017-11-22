import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from '../authorization/auth';
import Places from "./Places";
import PlacesHome from "./PlacesHome";

class TopMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn,
      userName: auth.userName,
      isUser: false,
      isAdmin: false
    }
    this.removeTable = this.removeTable.bind(this);

  }


  loginStatus = (status, userName, isUser, isAdmin) => {
    this.setState({ loggedIn: status, userName, isUser, isAdmin });
  }

  componentDidMount() {
    auth.setLoginObserver(this.loginStatus);
  }
 ;
  removeTable(){
    var arr = [];
    if(!this.state.loggedIn && document.URL === "http://localhost:3000/#/"){
      arr.push(<PlacesHome/>);
      return arr;
    } 
  }

  again(){
    var arr = [];
    if(this.state.loggedIn && !this.state.isAdmin && document.URL === "http://localhost:3000/#/"){
      arr.push(<Places/>);
      return arr;
    } else if(this.state.loggedIn && this.state.isAdmin && document.URL === "http://localhost:3000/#/"){
      arr.push(<PlacesHome/>);
      return arr;
    }
  }
  render() {
this.removeTable();
    const logInStatus = this.state.loggedIn ? "Logged in as: " + this.state.userName : "";
    var arr = this.removeTable();
    var arr2 = this.again();
    //console.log("RENDERING - REMOVE ME",JSON.stringify(this.state));
    return (

      <div>
        <nav className="navbar navbar-default" >
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/" style={{ pointerEvents: "none" }}>Semester Seed</a>
            </div>
            <ul className="nav navbar-nav">
    
              {this.state.loggedIn && (<li><Link to="/Places">See locations</Link></li>)}
              {!this.state.loggedIn && (<li><Link to="/">See locations</Link></li>)}
              {!this.state.loggedIn && (<li><Link to="/register">Register User</Link></li>)}
              {this.state.isUser && (<li><Link to="/user">Page for Users </Link></li>)}
              {this.state.isUser && (<li><Link to="/random">Random Number for Users </Link></li>)}
              {this.state.isAdmin && (<li><Link to="/admin">Page for Admins</Link></li>)}
              {this.state.isAdmin && (<li><Link to="/users">See all users</Link></li>)}
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
        {arr}
        {arr2}
      </div>
    );  
 
  }
}


export default TopMenu;