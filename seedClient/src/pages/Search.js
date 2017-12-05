import React, { Component } from 'react';
import { Link } from "react-router-dom";
import placeFacade from '../facades/placeFacade';
const imageURL = require("../../package.json").imageURL;
const locationurl = "/location/";
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            view: [],
            city: "",
            week: ""
        }
    }

    componentWillMount() {
        placeFacade.getData((e, locations) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", locations, view: locations });
        });
    }

    onChangeHandler = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState(prevState => (
            {
                ...prevState, [name]:value
            }
        ))
        this.updateView();
    }

    updateView = () => {
        let locations = this.state.locations;
        let week = this.state.week;
        let city = this.state.city.toLocaleLowerCase();
        let view = locations.filter(location => {
            return location.city.toLocaleLowerCase().startsWith(city);
        });
        this.setState({
            view
        });
    }

    render() {
        return (
            <div>
                <div>
                    <input className="form-control" type="text" placeholder="enter city name" name="city" value={this.state.city} onChange={this.onChangeHandler} />
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>title</th>
                                <th>CITY</th>
                                <th>STREET</th>
                                <th>ZIP</th>
                                <th>DESCRIPTION</th>
                                <th>IMAGE-URI</th>
                                <th>RATING</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.view.map(location => {
                                return (
                                    <tr key={location.id}>
                                        <td>{location.id}</td>
                                        <td><Link to={locationurl + location.id}>{location.title}</Link></td>
                                        <td>{location.city}</td>
                                        <td>{location.street}</td>
                                        <td>{location.zip}</td>
                                        <td>{location.description}</td>
                                        <td><img src={imageURL + location.imageUri} className="img-thumbnail" alt={location.imageUri} /></td>
                                        <td>{location.rating}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }



}