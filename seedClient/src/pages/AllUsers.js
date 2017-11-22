import React, { Component } from 'react'
import adminData from "../facades/adminFacade";

class AllUsers extends Component {

    constructor() {
        super();
        this.state = { data: [], err: "" }
    }

    componentWillMount() {
        /*
        This will fetch data each time you navigate to this route
        If only required once, add "logic" to determine when data should be "refetched"
        */
        adminData.getUsers((e, data) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", data });
        });
    }
    onclickHandler = (e) => {
        adminData.deleteUser(e.target.value);
        console.log(e.target.value);
        document.getElementById(e.target.value).remove();
    }
    onclickHandlerRol = (e) => {
        var name = e.target.value + "sel";
        adminData.editRole(e.target.value, document.getElementById(name).value);
        document.getElementById(e.target.value + "rol").innerHTML = document.getElementById(name).value;
    }
    
    onDeleteBook = () => {
        this.forceUpdate();
    }

    genList = () => {
        let users = this.state.data;
        console.log("bobbyffors:::" + users.map(user => user.username + user.roles.map(role => role).join('!')).join(','));
        return users.map(user => <li key={user.username}>{user.username + ", roles: " + user.roles.map(role => role).join(', ')}</li>);
    }

    genUserList = () => {
        let users = this.state.data;

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr id={user.username} key={user.username}>
                        <td>{user.username}</td>
                        <td id={user.username + "rol"}>{user.roles.map(role => role).join(", ")}</td>

                        <td> <select id={user.username + "sel"}>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="User_Admin">User&Admin</option>

                        </select>
                            <br></br>
                            <button value={user.username}onClick={this.onclickHandlerRol} >Change Role</button></td>
                        <td><button value={user.username} onClick={this.onclickHandler}>delete this user</button></td>
                    </tr>)}
                </tbody>
            </table>
        )
    }


    render() {
        console.log(this.state.data);
        return (
            <div>
                <h2>Users:</h2>
                {this.genUserList()}
                {this.state.err && (
                    <div className="alert alert-danger errmsg-left" role="alert">
                        {this.state.err}
                    </div>
                )}
            </div>
        )
    }
}

export default AllUsers;