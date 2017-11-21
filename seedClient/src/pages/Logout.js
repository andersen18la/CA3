import React, {Component} from "react";
import auth from "../authorization/auth";
import PlacesHome from "./PlacesHome";

export default class Logout extends Component{
  
  componentDidMount() {
    auth.logout();
  }

  render() {
    return (<div><p>You are now logged out</p>
    <PlacesHome/>
    </div>)
  }
}