import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class BookStore {
    constructor() {
        this._data = "";
        this._errorMessage = "";
    }

    addBooking(booking, cb) {
        this._errorMessage = "";
        this._messageFromServer = "";
        let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
        const options = fetchHelper.makeOptions("Post", false, booking);
        fetch(URL + "api/booking/add", options)
            .then((res) => {
                resFromFirstPromise = res;
                return res.json();
            }).then((data) => {
                errorChecker(resFromFirstPromise, data);
                if (cb) {
                    cb(null, data);
                }
            }).catch(err => {
                console.log(err);
                if (cb) {
                    cb({ errorMessage: fetchHelper.addJustErrorMessage(err) });
                }
            })
    }
}
let bookStore = new BookStore();
export default bookStore;