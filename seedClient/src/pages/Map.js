import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactDOM from 'react-dom';
import geocoder from 'geocoder'
import Places from './Places'
import placeData from '../facades/placeFacade'
import Modal from 'react-modal'
import PlaceForm from './PlaceForm'
const URL = require("../../package.json").serverURL;


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
const AnyReactComponent = ({ text, alerthis }) => (

    <div style={{
        position: 'relative', color: 'white', background: 'red',
        height: 30, width: 60, top: -20, left: -30,

    }}>
        {/*<button onClick={alerthis}>click here</button>*/}
        {text}
    </div>

);


export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "null", lat: 0.0, lng: 0.0, cities: [], dependencies: [], data: [], err: "", isOpen: false, modalIsOpen: false, geo: '' };0
        this.getCoords = this.getCoords.bind(this);
        this.goToPlace = this.goToPlace.bind(this);
        this.alerthis = this.alerthis.bind(this);
        this.chooseLocation = this.chooseLocation.bind(this);
        this.dataStuff = this.dataStuff.bind(this);
        this.splitTest = this.splitTest.bind(this);
        this.showLocations = this.showLocations.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.lol = this.lol.bind(this);
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

    openModal() {
        this.setState({ modalIsOpen: true });
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    updateTable = () => {
        placeData.getData((e, data) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", data, modalIsOpen: false });
        });
    }

    static defaultProps = {
        center: { lat: 55.41904033, lng: 10.33593535 },
        zoom: 6
    };
    alerthis() {
        alert("qwewq");
    }
    chooseLocation() {
        this.getCoords();
        setTimeout(() => {
            this.goToPlace();
        }, 700
        );
    }
    showLocations() {
        this.dataStuff();

        setTimeout(() => {
            this.splitTest();
        }, 700);
    }
    getCoords() {
        try {

            geocoder.geocode(document.getElementById("cityname").value + ", DK", function (err, data) {
                console.log(data);
                try {
                    document.getElementById("lat").value = data.results[0].geometry.location.lat;
                    document.getElementById("lng").value = data.results[0].geometry.location.lng;
                    document.getElementById("msg").style.color = "green";
                    document.getElementById("msg").innerHTML = "success!"
                } catch (e) {
                    document.getElementById("msg").style.color = "red";
                    document.getElementById("msg").innerHTML = "failure...";
                }
            });

        } catch (e) {
            alert("error");
        }
    }
    goToPlace() {
        this.setState({ city: document.getElementById("cityname").value, lat: document.getElementById("lat").value, lng: document.getElementById("lng").value });
    }

    dataStuff = () => {

        fetch(URL + "api/location/all").then(res => {
            return res.json();
        }).then(data => {
            var fill = "";

            for (var i = 0; i < data.length; i++) {
                if (i == data.length - 1) {
                    fill += data[i].city
                } else {
                    fill += data[i].city + ",";
                }
                document.getElementById("cities").innerHTML = fill;
            }
        })
    }

    addGeoToState = (geo) => {
        this.setState({ geo: geo });
    }

    splitTest() {
        if (document.getElementById("cities").innerHTML !== null) {
            var arr = document.getElementById("cities").innerHTML.split(",");
            var arrayvar = this.state.dependencies.slice();
            for (var i = 0; i < arr.length; i++) {
                var lat = 0.0;
                var lng = 0.0;
                var id = 1;
                geocoder.geocode(arr[i] + ", DK", function (err, data) {
                    try {
                        lat = data.results[0].geometry.location.lat;
                        lng = data.results[0].geometry.location.lng;
                        arrayvar.push({ id: id, city: data.results[0].formatted_address, lat: lat, lng: lng });
                        id++;
                    } catch (e) {
                        alert("ERROR!!!!!!");
                    }
                });
            }
            this.setState({ dependencies: arrayvar });
            console.log(this.state.dependencies);
            setTimeout(() => {
                this.goToPlace();
            }, 700);
        }
    }
    test=()=>{
        geocoder.geocode(document.getElementById("getCity").value + ", DK", function (err, data) {
            console.log(data.results[0])
        });
}
    lol=(e)=> {
        const that = this;
        geocoder.geocode(document.getElementById("getCity").value + ", DK", function (err, data) {
            try {
                var lat = 0.0;
                var lng = 0.0;
                lat = data.results[0].geometry.location.lat;
                lng = data.results[0].geometry.location.lng;
                //document.getElementById("getGeo").value = lat+","+lng;
               //console.log(this.state.geo);
                that.setState({geo: lat+','+lng});
            } catch (err) {
                console.log(err)
                alert(err);
            }
            
        });
    }
    yo(){
        alert("qwe");
    }
    render() {
        const mapped = this.state.dependencies.map(function (element) { return <AnyReactComponent lat={element.lat} lng={element.lng} text={element.city} key={element.id} /> })
        return (
            <div style={{ width: '100%', height: '500px' }}>
                <h3>Hello, please enter a city, street or zip that exists in Denmark in order to pinpoint your destination</h3>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}                >
                    <AnyReactComponent
                        lat={this.state.lat}
                        lng={this.state.lng}
                        text={this.state.city}
                        alerthis={this.alerthis}

                    />
                    {mapped}


                </GoogleMapReact>

                {this.state.cities}
                <button onClick={this.chooseLocation}>go to destination</button>
                <input id="cityname" type="text" /><span id="msg"></span>
                <input id="lat" type="hidden" value="55.41904033" />
                <input id="lng" type="hidden" value="10.33593535" />
                <p>coordinates: city: {this.state.city}, lat:{this.state.lat}, lng:{this.state.lng}</p>
                <button onClick={this.showLocations}>make locations appear</button>
                <p id="cities"></p>
                <div id="modal" className="container">
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
                                            <PlaceForm geo={this.state.geo} onAddPlace={this.onAddPlace} onCloseModal={this.closeModal} updateTable={this.updateTable} /></div>
                                        <div><button value={this.dataStuff.city} onClick={this.lol}>get geo info</button></div>
                                        <div className="modal-footer"><button className="btn btn-danger" onClick={this.closeModal}>close</button></div></div>
                                    {this.state.geo}
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}