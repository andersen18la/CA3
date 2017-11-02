import React, { Component } from "react";
import placeData from '../facades/placeFacade';

export default class Places extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], err: "" }
  }

  componentWillMount() {
    /*
    This will fetch data each time you navigate to this route
    If only required once, add "logic" to determine when data should be "refetched"
    */
    placeData.getData((e, data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", data });
    });

  }

  testing(){
    if(document.getElementById('pic').value != ""){

    
    var city = prompt('enter a city name');
    var street = prompt('enter street name and number');
    var zip = prompt('enter your zip code');
    var description = prompt('descripe your location');
    var url = document.getElementById('pic').value;
    var geo = "this_location : 112314125";
    var rating = 4;

var place = {
  city: city,
  street: street,
  zip: zip,
  description: description,
  url: url,
  geo: geo,
  rating: rating
  }

    placeData.createData(place);
    window.location.reload(true);
  } else {
alert('you did not upload a picture');
  }}

  genPlaceList = () => {
    let places = this.state.data;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
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
                <td>{place.city}</td>
                <td>{place.street}</td>


                <td>{place.zip}</td>
                <td>{place.description}</td>
                <td><img src={place.imageUri} className="img-thumbnail" alt={place.imageUri} /></td>
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

      <div><h1>Fetch data from Rest endpoint with all the places</h1><input id="pic" type="file"/><button onClick={this.testing}>add a new place</button>
        {this.genPlaceList()}
      </div>
    )

  }
}