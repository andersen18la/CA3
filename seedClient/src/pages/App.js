import { Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import Places from "./Places";
import PlacesHome from "./PlacesHome";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import TopMenu from "./TopMenu";
import AllUsers from "./AllUsers";
import Register from "./Register";
import React, { Component } from 'react';
import auth from '../authorization/auth';
import Map from './Map';
import MapTest2 from './MapTest2';
import MapTest3 from './MapTest3';

export default class App extends Component {






  render() {


  
    return (
      
      <div>
        <TopMenu />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/places" component={Places} />
          <Route path="/user" component={UserPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/users" component={AllUsers} />
          <Route path="/register" component={Register} />
          <Route path="/map" component={Map}  />
          <Route path="/map2" component={MapTest2}/>
          <Route path="/map3" component={MapTest3}/>

        </Switch>

      </div>
    )
  }
}