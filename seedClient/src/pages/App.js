import { Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import Places from "./Places";
import PlacesHome from "./PlacesHome";
import AdminPage from "./AdminPage";
import TopMenu from "./TopMenu";
import AllUsers from "./AllUsers";
import Register from "./Register";
import React, { Component } from 'react';
import auth from '../authorization/auth';
import Location from './Location';
import Bookings from './Bookings';
import HouseList from './HouseList';


export default class App extends Component {
  render() {
    return (

      <div>
        <TopMenu />
        <Switch>
          {auth.isloggedIn && <Route exact path='/' component={Places} />}
          {!auth.isloggedIn && <Route exact path='/' component={PlacesHome} />}
          <Route exact path='/' component={PlacesHome} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/places" component={Places} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/users" component={AllUsers} />
          <Route path="/register" component={Register} />
          <Route path="/location/:id" component={Location} />
          <Route path="/houses" component={HouseList} />
        </Switch>

      </div>
    )
  }
}