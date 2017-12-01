import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class HouseStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
    }

    getData = (cb) => {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("GET", false);
        fetch(URL + "api/house/all", options)
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
let houseStore = new HouseStore();
export default houseStore;