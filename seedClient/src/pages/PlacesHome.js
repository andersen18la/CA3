import React, { Component } from "react";
import placeData from '../facades/placeFacade';
import MapTest2 from './MapTest2';
const imageURL = require("../../package.json").imageURL;

export default class PlacesHome extends Component {
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

  onAddPlace = () => {
    this.forceUpdate();
  }

  //DET HER SKAL FLYTTES UD
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
                <td><img src={imageURL + place.imageUri} className="img-thumbnail" alt={place.imageUri} /></td>
                <td>{place.rating}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  /*
          <input id="pic" type="file" />
        <button onClick={this.testing}>add a new place</button>
  */
  render() {
    console.log(this.state.data);
    return (

      <div>
        <MapTest2 placeList={this.state.data} />
        <div id="places">{this.genPlaceList()}</div>
      </div>
    )

  }
}


