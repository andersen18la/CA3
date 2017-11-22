import React, { Component } from "react";
import placeData from '../facades/placeFacade';
import PlaceForm from "./PlaceForm";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Places extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], err: "", isOpen: false, modalIsOpen: false }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
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
    //this.forceUpdate();
  }

  //DET HER SKAL FLYTTES UD
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
                <td><img src={"https://jdbh.dk/images/" + place.imageUri} className="img-thumbnail" alt={place.imageUri} /></td>
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

        <h1>Fetch data from Rest endpoint with all the places</h1>
        
        <div className="container">
        <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"onClick={this.openModal}>Add Location</button>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
             
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 <div>
 <div className="modal-header"><h2 ref={subtitle => this.subtitle = subtitle}>Add Location</h2></div>
          <div className="modal-body">
          <PlaceForm onAddPlace={this.onAddPlace} onCloseModal={this.closeModal} /></div>
          <div className="modal-footer"><button className="btn btn-danger" onClick={this.closeModal}>close</button></div></div>
        </Modal></div></div></div>
      </div>
        <div id="places">{this.genPlaceList()}</div>
        
      </div>
    )
  }
}
