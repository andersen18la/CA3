import React, { Component } from 'react';
import placeStore from '../facades/placeFacade';
import FileUpload from './FileUpload';
const URL = require("../../package.json").serverURL;

export default class PlaceForm extends Component {
    //skal have auth user med?
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
        placeStore.createData(place, this.props.updateTable);
        this.props.onCloseModal();
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

    onClickHandler = e => {
        e.preventDefault();
        var file = document.querySelector('input[type="file"]');
        var city = document.getElementById("city").value;
        var description = document.getElementById("description").value;
        var street = document.getElementById("street").value;
        var zip = document.getElementById("zip").value;
        var geo = document.getElementById("geo").value;
        var data = new FormData();
        data.append("city", city);
        data.append("description", description);
        data.append("street", street);
        data.append("zip", zip);
        data.append("geo", geo);
        data.append("user", 'WEB User');
        data.append('file', file.files[0]);
        console.log(data);
        fetch(URL + "api/places/add",
            {
                method: "POST",
                body: data,

            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                //ops! picture stuff will only update correctly when deployed on tomcat
                let place = this.state.place;
                placeStore.createData(place, this.props.updateTable);
                this.props.onCloseModal();
            });
    }



    render() {
        console.log(this.state.place);
        return (
            <div><center>




                <form className="form-inline" onSubmit={this.onClickHandler}>

                    City:<br /> <input id="city" name="city" className="form-control" type="text" onChange={this.onChangeHandler} value={this.state.place.city} required /><br />
                    Description:<br /> <input id="description" name="description" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.description} required /><br />
                    Street:<br /> <input id="street" name="street" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.street} required /><br />
                    Zip:<br /> <input id="zip" name="zip" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.zip} required /><br />
                    Geo:<br /> <input id="geo" name="geo" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.geo} required /><br />
                    {/*ImageUri:<br /> <input name="url" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.url} required readOnly /><br /><br />*/}
                    {/*<br/><FileUpload className="form-control" onFileUpload={this.onFileUpload} /><br/>*/}
                    <input type="file" name="file" />
                    <input className="btn btn-success" type="submit" value="Save the place" />
                </form>
            </center ></div>
        );
    }

}
