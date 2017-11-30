import React, { Component } from "react";
import placeData from '../facades/placeFacade';
import PlaceForm from "./PlaceForm";
import Modal from 'react-modal';
import auth from '../authorization/auth';
import PlaceList from './PlaceList';
import MapTest2 from './MapTest2';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class Places extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], err: "", isOpen: false, modalIsOpen: false }
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
      this.setState({ err: "", data, modalIsOpen: false });
    });
  }

  openModal = () => {
    this.setState(prevState => ({
      ...prevState, modalIsOpen: true
    }));
  }
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState(prevState => ({
      ...prevState, modalIsOpen: false
    }));
  }

  updateTable = () => {
    placeData.getData((e, data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", data, modalIsOpen: false });
    });
  }

  render() {
    return (
      <div>        
       <div className="amapname">
          <MapTest2 placeList={this.state.data} />
        </div>        <div id="places"><div id="modal" className="container">
          <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onClick={this.openModal}>Add Location</button>
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
                    <div className="modal-header"><h2 ref={subtitle => this.subtitle = subtitle}>Example Text For Add Location</h2></div>
                    <div className="modal-body">
                      <PlaceForm onAddPlace={this.onAddPlace} onCloseModal={this.closeModal} updateTable={this.updateTable} /></div>
                    <div className="modal-footer"><button className="btn btn-danger" onClick={this.closeModal}>close</button></div></div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
          <PlaceList places={this.state.data} userId={auth._userName} updateTable={this.updateTable} />
        </div> 

      </div>
    )

  }
}