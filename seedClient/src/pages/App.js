import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import About from "./About";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";
import TopMenu from "./TopMenu";
import RandomNumber from "./RandomNumber";
import AllUsers from "./AllUsers";
import Register from "./Register";


function App() {
  return (
    <div>
      <TopMenu />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About} />
        <Route path="/user" component={UserPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/random" component={RandomNumber} />
        <Route path="/users" component={AllUsers} />
        <Route path="/register" component={Register}/>
      </Switch>
    </div>
  )
}
export default App;