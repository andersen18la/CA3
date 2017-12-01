import React, { Component } from 'react';
import placeFacade from '../facades/placeFacade';
import auth from '../authorization/auth';
import House from './House';
import Rating from './Rating';

const imageurl = "http://localhost:8084/seedMaven/imgs/"

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "", location: {}, isloggedIn: auth.isloggedIn, showingHouses: false
        }
    }

    componentDidMount() {
        placeFacade.getLocation(this.props.match.params.id, (e, location) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", location });
        })
    }

    updateMyState = () => {
        placeFacade.getLocation(this.props.match.params.id, (e, location) => {
            if (e) {
                return this.setState({ err: e.err })
            }
            this.setState({ err: "", location });
            this.forceUpdate();
        })
    }

    showStars = () => {
        let rating = this.state.location.rating;
        console.log(rating);
        if (rating) {
            if (rating === 0) {
                return "People have rated this place 0..."
            }
            if (rating >= 1 && rating < 2) {
                return "⭐"
            }
            if (rating >= 2 && rating < 3) {
                return "⭐⭐"
            }
            if (rating >= 3 && rating < 4) {
                return "⭐⭐⭐"
            }
            if (rating >= 4 && rating < 5) {
                return "⭐⭐⭐⭐"
            }
            if (rating === 5) {
                return "⭐⭐⭐⭐⭐"
            }
        }
        return "Not rated yet... :(";
    }

    showHouses = () => {
        if (this.state.showingHouses === true) {
            console.log(auth.userName)
            let houses = this.state.location.houses;
            if (houses) {
                return (
                    <div className="jumbotron">
                        {houses.map(house => (
                            <House
                                key={house.id}
                                house={house}
                                isloggedIn={this.state.isloggedIn}
                                userId={auth.userName}
                                imageurl={imageurl + house.imageUri}
                                updateLocationState={this.updateMyState}
                            />
                        ))}
                    </div>
                )
            }
            return "No houses in the city of this location";
        }
    }

    showingHousesHandler = e => {
        if (this.state.showingHouses === false) {
            this.setState({
                showingHouses: true
            })
        } else {
            this.setState({
                showingHouses: false
            })
        }
    }

    hasUserRated = () => {
        if (this.state.isloggedIn && this.state.location) {
            let ratings = this.state.location.ratings;
            if (ratings) {
                let filterResult = ratings.filter(rating => {
                    return auth.userName === rating.userId;
                });
                if (filterResult.length > 0) {
                    return "you have already rated";
                }
                return <Rating placeId={this.props.match.params.id} userId={auth.userName} updateTable={this.updateMyState} />
            }
        }
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <h1 className="text-center">{this.state.location.title}</h1>
                <hr />

                <button name="showHousesBtn" className="btn btn-default" onClick={this.showingHousesHandler}>Show rentable houses near location</button>
                {this.showHouses()}
                <h2>Rating:{this.showStars()}</h2>
                <div>
                    {this.hasUserRated()}
                </div>

                <div id={"locationImage"}>
                    <img src={imageurl + this.state.location.imageUri} alt={this.state.imageUri} className="img-thumbnail" />
                </div>
                <hr />
                <h3 className="text-center">Description</h3>
                <p className="text-center">{this.state.location.description}</p>
                <hr />
                <h3 className="text-center">Address</h3>
                <p className="text-center">{this.state.location.street}</p>
                <p className="text-center">{this.state.location.city}</p>
                <p className="text-center">{this.state.location.zip}</p>
            </div>
        )
    }
}