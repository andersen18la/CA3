import React, { Component } from 'react';

const URL = require("../../package.json").serverURL;

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export default class HouseForm extends Component {
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

    //findes addressen i den virkelige verden? 
    doesAddressExistInTheRealWorld = () => {
        //kan være den driller når man deployer...
        //fetch string for addresser og zip: "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.place.street + "+zip=" + this.state.place.zip + "country=dk"
        //fetch string for kun byer: ""https://maps.googleapis.com/maps/api/geocode/json?address=''+zip=" + this.state.place.city + "country=dk""
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=''+city=" + this.state.place.city + "country=dk")
            .then(res => res.json())
            .then(data => {
                console.log("forhelve" + data.results[0])
                if (data.status !== "ZERO_RESULTS") {
                    console.log("vi er herinde" + data);
                    //så laver vi en ægte geolocation...
                    let lat = data.results[0].geometry.location.lat;
                    let lng = data.results[0].geometry.location.lng;
                    let geo = lat + "," + lng;
                    this.setState(prevState => (
                        {
                            place: { ...prevState.place, geo }
                        }
                    ));
                    this.submitData();
                } else {
                    this.submitData();
                }
            });
    }

    submitData = () => {
        const place = this.state.place;
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
        fetch(URL + "api/house/add",
            {
                method: "POST",
                body: data,
            })
            .then(handleErrors)
            .then(data => {
                console.log("hello from add house " + data);
                this.props.onCloseModal();
                this.props.updateTable();
            }).catch(error => {
                //alert("imagetype is wrong");
                console.log(error);
            });

    }

    onSubmitHandler = e => {
        e.preventDefault();
        this.doesAddressExistInTheRealWorld();

    }

    render() {
        console.log(this.state.place);
        return (
            <div>
                <center>
                    <form id="usrform" className="form-inline" onSubmit={this.onSubmitHandler}>
                        Title:<br /> <input name="title" className="form-control" type="text" onChange={this.onChangeHandler} value={this.state.place.title} required /><br />
                        City:<br /> <input id="getCity" name="city" className="form-control" type="text" onChange={this.onChangeHandler} value={this.state.place.city} required /><br />
                        Description:<br /><textarea className="form-control" style={{ height: 200, width: 300 }} onChange={this.onChangeHandler} name="description" form="usrform"></textarea><br />
                        Street:<br /> <input name="street" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.street} required /><br />
                        Zip:<br /> <input name="zip" type="text" className="form-control" onChange={this.onChangeHandler} value={this.state.place.zip} required /><br />
                        <br /><input type="file" className="form-control" accept=".jpg,.png" name="file" required /><br />
                        <input className="btn btn-success" type="submit" value="Save the place" />
                    </form>

                </center>
            </div>
        );
    }

}
