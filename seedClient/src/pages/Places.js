import React, { Component } from "react";
import placeData from '../facades/placeFacade';

export default class Places extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], err: "" }
    this.testing = this.testing.bind(this);
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

  testing() {
    if (document.getElementById('pic').value != "") {


      var city = prompt('enter a city name');
      var street = prompt('enter street name and number');
      var zip = prompt('enter your zip code');
      var description = prompt('descripe your location');
      var url = document.getElementById('pic').value;
      var geo = "this_location : 112314125";
      var rating = prompt('give this place a rating 1 out of 5');
      while (isNaN(rating) || ((!isNaN(rating) && rating < 1) ||
        (!isNaN(rating) && rating > 5))) {
        rating = prompt('either that was not a number or you did not rate 1-5, try again');
      }

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
      var data = this.state.data.slice()
      data.push({id: data.length+1, city: city, street: street, zip: zip, description: description, imageUri: url, rating: rating});
      this.setState({ data: data })
      
    } else {
      alert('you did not upload a picture');
    }
  }

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

      <div><h1>Fetch data from Rest endpoint with all the places</h1><input id="pic" type="file" /><button onClick={this.testing}>add a new place</button>
        <div id="places">{this.genPlaceList()}</div>
      </div>
    )

  }
}