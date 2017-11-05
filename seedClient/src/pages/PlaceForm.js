import React, { Component } from 'react';
import placeStore from '../facades/placeFacade';
import FileUpload from './FileUpload';

export default class PlaceForm extends Component {
    //skal have auth user med.
    constructor(props) {
        super(props);
        this.state = {
            place: {
                city: "",
                street: "",
                zip: "",
                description: "",
                url: "",
                geo: "",
                rating: ""
            },
            isDirty: false,
        };
    }

    onSubmitHandler = e => {
        e.preventDefault();
        let place = this.state.place;
        console.log(place);
        placeStore.createData(place);
    }

    onFileUpload = (data) => {
        this.setState(prevState => (
            {
                place: { ...prevState.place, url: data }
            }
        ))
    }

    onChangeHandler = e => {
        e.preventDefault();
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.setState(prevState => (
            {
                place: { ...prevState.place, [name]: value },
                isDirty: true
            }
        ));
    }



    render() {
        console.log(this.state.place);
        return (
            <div>
                <FileUpload onFileUpload={this.onFileUpload} />
                <form className="form-inline" onSubmit={this.onSubmitHandler}>
                    City: <input name="city" type="text" onChange={this.onChangeHandler} value={this.state.place.city} required />
                    Description: <input name="description" type="text" onChange={this.onChangeHandler} value={this.state.place.description} required />
                    Street: <input name="street" type="text" onChange={this.onChangeHandler} value={this.state.place.street} required />
                    Zip: <input name="zip" type="text" onChange={this.onChangeHandler} value={this.state.place.zip} required />
                    Geo: <input name="geo" type="text" onChange={this.onChangeHandler} value={this.state.place.geo} required />
                    ImageUri: <input name="url" type="text" onChange={this.onChangeHandler} value={this.state.place.url} required readOnly />
                    Rating: <input name="rating" type="number" onChange={this.onChangeHandler} value={this.state.place.rating} min="0" max="5" required />
                    <input type="submit" value="Save the place" />
                </form>
            </div >
        );
    }

}