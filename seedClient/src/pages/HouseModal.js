import React, { Component } from "react";
import placeData from '../facades/placeFacade';
import HouseForm from "./HouseForm";
import Modal from 'react-modal';
import auth from '../authorization/auth';
import MapTest2 from './MapTest2';
import LocModal from './LocationModal'
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
export default class HouseModal extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], err: "", isOpen: false, modalIsOpen: false }
      }

    componentWillMount() {
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
        // references are now sync'd and ca0n be accessed.
        this.subtitle.style.color = '#f00';
      }
    
      closeModal = () => {
        this.setState(prevState => ({
          ...prevState, modalIsOpen: false
        }));
        this.props.update();
 
      }


    render(){
        return (<div id="modal" className="container">
        <button  className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.openModal}>Add House</button>
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
                  <div className="modal-header"><h2 ref={subtitle => this.subtitle = subtitle}>Example Text For Add House</h2></div>
                  <div className="modal-body">
                    <HouseForm onAddPlace={this.onAddPlace} onCloseModal={this.closeModal}/></div>
                  <div className="modal-footer"><button className="btn btn-danger" onClick={this.closeModal}>close</button></div></div>
              </Modal>
            </div>
          </div>
        </div>
      </div>);
    };

}