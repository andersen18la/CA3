import fetchHelper, { errorChecker } from "./fetchHelpers"
const URL = require("../../package.json").serverURL;


class AdminStore {
  constructor() {
    this._data = "";
    this._errorMessage = "";
  }

  getData = (cb) => {
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/demoadmin", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise, data);
        if (cb) {
          cb(null, data.message)
        }
      }).catch(err => {
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }

  deleteUser = (userName, cb) => {
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
    let headers = {
      "Content-type": "Application/json"
    };
    headers.Authorization = `Bearer ${sessionStorage.token}`;
    var options = {
      method: "DELETE",
      body: JSON.stringify({ userName: userName }),
      headers: headers

    }



    fetch(URL + "api/demoadmin/delete", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise, data);
        if (cb) {
          cb();
        }
      }).catch(err => {
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }
  
  editRole = (user, role, cb) => {
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
    let headers = {
      "Content-type": "Application/json"
    };
    headers.Authorization = `Bearer ${sessionStorage.token}`;
    var options = {
      method: "PUT",
      body: JSON.stringify({ user: user, role: role }),
      headers: headers

    }



    fetch(URL + "api/demoadmin/edit", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise, data);
        if (cb) {
          cb();
        }
      }).catch(err => {
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }

  getUsers = cb => {
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/demoadmin/users", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise, data);
        if (cb) {
          cb(null, data.users)
        }
      }).catch(err => {
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }
}

let adminStore = new AdminStore();

//Only for debugging
//window.userStore = userStore;
export default adminStore;