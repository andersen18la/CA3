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
        return this.state.data.map(name => <li key={name}>{name}</li>)
    }

    render() {
        console.log(this.state.data);
        return (
            <div>
                <h2>Admins</h2>
                <p>This message is fetched from the server if you were properly logged in</p>
                <div className="msgFromServer">
                    {this.genList()}
                </div>
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