import React, { Component } from 'react';
const URL = require("../../package.json").serverURL;

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export default class PlaceForm extends Component {
    //skal have auth user med?
    constructor(props) {
        super(props);
        this.state = {
            place: {
                title: "",
                city: "",
                street: "",
                zip: "",
                description: "",
                url: "",
                geo: "",
                rating: "",
            }
        };
    }

    onChangeHandler = e => {
        e.preventDefault();
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState(prevState => (
            {
                place: { ...prevState.place, [name]: value }
            }
        ));
    }

    onSubmitHandler = e => {
        e.preventDefault();
        let place = this.state.place;
        let file = document.querySelector('input[type="file"]');
        let data = new FormData();
        //det her må man kunne gøre mere smart...
        data.append("title", place.title);
        data.append("city", place.city);
        data.append("description", place.description);
        data.append("street", place.street);
        data.append("zip", place.zip);
        data.append("geo", place.geo);
        data.append("user", 'WEB User');
        data.append('file', file.files[0]);
        console.log(data);
        fetch(URL + "api/places/add",
            {
                method: "POST",
                body: data,
            })
            .then(handleErrors)
            .then(data => {
                console.log("hello from add place " + data);
                this.props.onCloseModal();
                this.props.updateTable();
                this.setState({
                    place: {
                        title: "",
                        city: "",
                        street: "",
                        zip: "",
                        description: "",
                        url: "",
                        geo: "",
                        rating: ""
                    }
                })
            }).catch(error => {
                alert("imagetype is wrong");
            });
    }

    render() {
        console.log(this.state.place);
        return (
            <div>
                <center>
                    <form id="usrform" className="form-inline" onSubmit={this.onSubmitHandler}>
                        Title:<br /> <input name="title" className="form-control" type="text" onChange={this.onChangeHandler} value={this.state.place.title} required /><br />
                        City:<br /> <input name="city" className="form-control" type="text" onChange={this.onChangeHandler} value={this.state.place.city} required /><br />
                        Description:<br /><textarea className="form-control" style={{ height: 200, width: 300 }} onChange={this.onChangeHandler} name="description" form="usrform"></textarea><br />
                        Street:<br /> <input name="street" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.street} required /><br />
                        Zip:<br /> <input name="zip" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.zip} required /><br />
                        Geo:<br /> <input name="geo" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.geo} required /><br />
                        <br /><input type="file" className="form-control" accept=".jpg,.png" name="file" required /><br />
                        <input className="btn btn-success" type="submit" value="Save the place" />
                    </form>

                </center>
            </div>
        );
    }

}
