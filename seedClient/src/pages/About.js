import React, { Component } from "react";
import placeData from '../facades/placeFacade';

export default class About extends Component {
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

  genPlaceList = () => {
    let places = this.state.data;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>CITY</th>
            <th>STREET</th>
            <th>DESCRIPTION</th>
            <th>ZIP</th>
            <th>IMAGE-URI</th>
            <th>RATING</th>

          </tr>
        </thead>
        <tbody>
          {places.map(place => {
            return (
              <tr key={place.id}>
                <td>{place.id}</td>
                <td>{place.street}</td>
                <td>{place.city}</td>
                <td>{place.zip}</td>
                <td>{place.description}</td>
                <td>{place.imageUri}</td>
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

      <div><h1>Fetch data from Rest endpoint with all the places</h1>
        {this.genPlaceList()}
      </div>
    )

  }
}