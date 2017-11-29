import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

//fatter seriøst ikke det der compose pis.

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDtabi8j49AR_JCDGC8kfeC2zaso-NRGQ4",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
)((props) =>
    <GoogleMap key={"hvad mener du"}
        apiKey={"AIzaSyDtabi8j49AR_JCDGC8kfeC2zaso-NRGQ4"}
        defaultZoom={6}
        defaultCenter={{ lat: 56.15, lng: 10.5 }}
    >
        {props.isMarkerShown && props.placeList.map((location) => {

            let geoSplit = location.geo.split(',');
            return (<Marker key={location.id} position={{ lat: parseFloat(geoSplit[0]), lng: parseFloat(geoSplit[1]) }} onClick={props.onMarkerClick} />)
        })}
    </GoogleMap>
    )

export default class MapTest extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { isMarkerShown: true }
    }

    componentDidMount() {

    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        console.log()
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent isMarkerShown={this.state.isMarkerShown} onMarkerClick={this.handleMarkerClick} placeList={this.props.placeList} />
        )
    }
}