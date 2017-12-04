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
  updateTable1 = () => {
    houseData.getData((e, data) => {
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
        </div>
    {/*location-modal*/}
          <div id="places"><div id="modals" >
          <div class="row">
   
</div>


<HouseModal update1={this.updateTable1}/>
          <LocationModal update={this.updateTable}/>
          
          <PlaceList places={this.state.data} userId={auth._userName} updateTable={this.updateTable} />
          <HouseList places={this.state.data} userId={auth._userName} updateTable={this.updateTable1}/>

        </div></div>
        {/*house-modal*/}
      </div>
    )

  }
}