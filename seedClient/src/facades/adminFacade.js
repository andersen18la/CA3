getInfo = cb => {
  this._errorMessage = "";
  this._messageFromServer = "";
  let resFromFirstPromise = null;  //Pass on response the "second" promise so we can read errors from server
  const options = fetchHelper.makeOptions("GET", true);
  fetch(URL + "api/places/add", options)
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