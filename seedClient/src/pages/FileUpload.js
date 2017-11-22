import React, { Component } from 'react';
const URL = require("../../package.json").serverURL;

export default class FileUpload extends Component {
    //kan laves om til en function, bruger ikke state pt.
    constructor(props) {
        super(props);
        this.state = {
            imageuri: ""
        }
    }

    onClickHandler = e => {
        e.preventDefault();
        var input = document.querySelector('input[type="file"]');
        var data = new FormData();
        data.append('file', input.files[0]);
        data.append("user", 'WEB User');
        fetch(URL + "api/upload/file",
            {
                method: "POST",
                body: data,
                enctype: "multipart/form-data"
            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                this.updatePicture(data)
            });
    }

    updatePicture = data => {
        console.log(data.imageuri);
        this.props.onFileUpload(data.imageuri);
    }
    render() {
        return (
            <div>
                <input type="file" name="file" />
                {/*<button id="btn" onClick={this.onClickHandler}> upload image </button>*/}
            </div>

        )
    }
}