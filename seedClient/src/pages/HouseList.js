import React, { Component } from 'react';
import houseFacade from '../facades/houseFacade';

export default class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            err: ""
        }
    }

    componentWillMount() {
        houseFacade.getData((e, data) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", data, modalIsOpen: false });
        });

    }

    genPlaceList = () => {
        let places = this.state.data;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>CITY</th>
                        <th>STREET</th>
                        <th>ZIP</th>
                        <th>DESCRIPTION</th>
                        <th>IMAGE-URI</th>
                        <th>RATING</th>

                    </tr>
                </thead>
                <tbody>
                    {places.map(place => {
                        return (
                            <tr key={place.id}>
                                <td>{place.id}</td>
                                <td>{place.title}</td>
                                <td>{place.city}</td>
                                <td>{place.street}</td>
                                <td>{place.zip}</td>
                                <td>{place.description}</td>
                                <td><img src={"http://localhost:8084/seedMaven/imgs/" + place.imageUri} className="img-thumbnail" alt={place.imageUri} /></td>
                                <td>{place.rating}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    render() {
        console.log(this.state.data);
        return (

            <div>                
                {this.genPlaceList()}
            </div>
        )
    }


}