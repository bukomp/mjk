import React, {Component} from 'react';
import {getAllMedia, uploadFile} from "../util/MediaAPI";


class Uploads extends Component {
  state = {};


  handleSubmit = (evt) => {
    evt.preventDefault();
    const newForm = new FormData();
    for (let g in this.state ) {
      newForm.append(g, this.state[g]);
    }
    uploadFile(localStorage.token, newForm).then(res => {console.log(res);}).catch(error => {console.log(error);});
    console.log(newForm.entries());

    getAllMedia().then(result => {this.props.setPicArray(result);});
    setTimeout(()=>{this.props.history.push('/');}, 4000);
  };

  handleInputChange = (evt) => {
    //console.log(this.state.fragmentLogin);
    console.log(evt.target.name);
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    //console.log(value, name);

    this.setState(state => ({
        [name]: value,
      })
    );
  };

  handleFileInput = (evt) => {
    evt.persist();
    const target = evt.target;
    const file = target.files[0];
    this.setState(state => ({file: file}));
    console.log(this.state);
  };

  render = () => {
    return(
      <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" name="fileUpload" id="fileUpload">
        <input type="text" name="title" onChange={this.handleInputChange} placeholder="title" />
        <br/>
        <textarea name="description" onChange={this.handleInputChange} placeholder="description" />
        <br/>
        <input type="file" name="file" onChange={this.handleFileInput} accept="image/*"/>
        <br/>
        <input type="submit" value="uploadTheMeme" name="submit"/>
      </form>
    );
  }
}

export default Uploads;