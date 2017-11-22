import React, { Component } from 'react';
import placeStore from '../facades/placeFacade';
import FileUpload from './FileUpload';
import Modal from 'react-modal';

export default class PlaceForm extends Component {
    //skal have auth user med.
    constructor(props) {
        super(props);
        this.state = {
            place: {
                city: "",
                street: "",
                zip: "",
                description: "",
                url: "",
                geo: "",
                rating: ""
            },
            isDirty: false,
           
        };
        
    }

    onSubmitHandler = e => {
        e.preventDefault();
       
        let place = this.state.place;
        console.log(place);
        placeStore.createData(place);
        this.props.onCloseModal();
        this.props.updateTable();

        
        
    }

    onFileUpload = (data) => {
        this.setState(prevState => (
            {
                place: { ...prevState.place, url: data }
            }
        ))
        document
    }
    

    onChangeHandler = e => {
        e.preventDefault();
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.setState(prevState => (
            {
                place: { ...prevState.place, [name]: value },
                isDirty: true
            }
        ));
    }



    render() {
        console.log(this.state.place);
        return (
            <div><center>
                     
        
                <FileUpload onFileUpload={this.onFileUpload} />
                
                <form className="form-inline" onSubmit={this.onSubmitHandler}>
               
                    City:<br/> <input name="city" type="text" onChange={this.onChangeHandler} value={this.state.place.city} required /><br/>
                    Description:<br/> <input name="description" type="text" onChange={this.onChangeHandler} value={this.state.place.description} required /><br/>
                    Street:<br/> <input name="street" type="text" onChange={this.onChangeHandler} value={this.state.place.street} required /><br/>
                    Zip:<br/> <input name="zip" type="text" onChange={this.onChangeHandler} value={this.state.place.zip} required /><br/>
                    Geo:<br/> <input name="geo" type="text" onChange={this.onChangeHandler} value={this.state.place.geo} required /><br/>
                    ImageUri:<br/> <input name="url" type="text" onChange={this.onChangeHandler} value={this.state.place.url} required readOnly /><br/><br/>
                    
          
          
          <input className="btn btn-success" type="submit"  value="Save the place" />
               </form>
            </center ></div>
        );
    }

}
