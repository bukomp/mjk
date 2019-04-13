import React, {Component} from 'react';
import {getAllMedia, uploadFile} from "../util/MediaAPI";
import {CircularProgress, Input, TextField, Button} from '@material-ui/core';



class Uploads extends Component {
  state = {
    form:{},
    isUploaded:false,
    isSent:false,
    file:null
  };


  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({isSent:true});
    const newForm = new FormData();
    for (let g in this.state.form ) {
      newForm.append(g, this.state.form[g]);
    }
    uploadFile(localStorage.token, newForm).then(res => {console.log(res);}).catch(error => {console.log(error);});


    setTimeout(()=>{getAllMedia().then(result => {this.props.setPicArray(result);this.props.history.push('/');});}, 2000);
  };

  handleInputChange = (evt) => {
    console.log(this.state);
    console.log(evt.target.name);
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    const tempArr = this.state.form;
    tempArr[name] = value;
    this.setState(state => ({
        form: tempArr,
      })
    );
  };

  handleFileInput = (evt) => {
    evt.persist();
    const reader = new FileReader();
    const target = evt.target;
    const file = target.files[0];
    const tempArr = this.state.form;
    reader.readAsDataURL(file);
    reader.onloadend = () => {this.setState({file:reader.result})};
    tempArr.file = file;
    this.setState({form: tempArr, isUploaded:true});
    console.log(this.state);
  };

  render = () => {
    return(
      <React.Fragment>
      {!this.state.isSent &&
        <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" name="fileUpload" id="fileUpload">
          <Input type="text" name="title" onChange={this.handleInputChange} placeholder="title" />
          <br/>
          <TextField name="description" onChange={this.handleInputChange} placeholder="description" />
          <br/>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={this.handleFileInput}
          />
          <label htmlFor="raised-button-file">
            <Button variant="text" component="span">
              Upload file
            </Button>
          </label>


          <br/>
          {this.state.isUploaded &&
            <React.Fragment>
              <img src={this.state.file} style={{width:"200px"}} alt="img"/>
              <br/>
            </React.Fragment>
          }
          <Button  type="submit" variant="raised" value="uploadTheMeme" name="submit">Upload</Button>
        </form>
      }
      {this.state.isSent &&
        <React.Fragment>
          <CircularProgress/>
        </React.Fragment>
      }
      </React.Fragment>
    );
  }
}

export default Uploads;