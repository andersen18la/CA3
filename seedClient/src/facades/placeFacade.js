import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;


class PlaceStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";

    }

    getData = (cb) => {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("GET", false);
        fetch(URL + "api/location/all", options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data)
                }
            }).catch(err => {
                if (cb) {
                    cb({ err: fetchHelper.addJustErrorMessage(err) })
                }
            })
    }
    createData(place, cb) {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("Post", false, place);
        fetch(URL + "api/location/add", options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data);
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    createRating(rating, cb) {
        console.log("create rating" + rating);
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("Post", true, rating);
        fetch(URL + "api/rating", options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data);
                }
            }).catch(err => {
                console.log(JSON.stringify(err))
            })
    }
    
    getLocation = (id, cb) => {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("GET", false);
        fetch(URL + "api/location/" + id, options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data)
                }
            }).catch(err => {
                if (cb) {
                    cb({ err: fetchHelper.addJustErrorMessage(err) })
                }
            })
    }

}




let placeStore = new PlaceStore();

//Only for debugging
//window.userStore = userStore;
export default placeStore;