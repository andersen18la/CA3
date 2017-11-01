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
                    {users.map(user => <tr key={user.username}><td>{user.username}</td><td>{user.roles.map(role => role).join(", ")}</td></tr>)}
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