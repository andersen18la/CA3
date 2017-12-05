import React, { Component } from "react";
import placeData from '../facades/placeFacade';
import houseData from '../facades/houseFacade';
import PlaceForm from "./PlaceForm";
import Modal from 'react-modal';
import auth from '../authorization/auth';
import PlaceList from './PlaceList';
import MapTest2 from './MapTest2';
import LocationModal from './LocationModal';
import HouseModal from './HouseModal';
import HouseList from './HouseList';

const customStyles = {
  content: {
    top: '51%',
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
    this.state = { data: [], houses : [], err: "", isOpen: false, modalIsOpen: false }
  }

  componentWillMount() {
    placeData.getData((e, data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", data, modalIsOpen: false });
    });
  }

  updateTable = () => {
    placeData.getData((e, data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", data, modalIsOpen: false });
    });
  }
  updateHouseTable = () => {
    houseData.getData((e, data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", houses : data, modalIsOpen: false });
      console.log("this here: " + this.state.houses[0].city);
    });
  }


  render() {
    return (
      <div>
        <div className="amapname">
          <MapTest2 placeList={this.state.data} houseList={this.state.houses} />
        </div>
        {/*location-modal*/}
        <div id="places"><div id="modals" >
          <div id="modalsGo">

         
   
    <HouseModal  update={this.updateHouseTable}/>
    <LocationModal update={this.updateTable} /> 
  
</div>



          <PlaceList places={this.state.data} userId={auth._userName} updateTable={this.updateTable} /> 

        </div></div>
        {/*house-modal*/}
      </div>
    )

  }
}