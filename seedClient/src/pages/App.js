
import { Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import Places from "./Places";
import PlacesHome from "./PlacesHome";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import TopMenu from "./TopMenu";
import RandomNumber from "./RandomNumber";
import AllUsers from "./AllUsers";
import Register from "./Register";
import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
}
  stuff() {
    var arr = [];
    if(document.URL == "http://localhost:3000/#/"){
      arr.push(<PlacesHome/>);
      return arr;
    }
  }


  render() {
    var getText = this.stuff();
    return (
      <div>
        <TopMenu />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/places" component={Places} />
          <Route path="/user" component={UserPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/random" component={RandomNumber} />
          <Route path="/users" component={AllUsers} />
          <Route path="/register" component={Register} />
        </Switch>
        {getText}
      </div>
    )
  }
}