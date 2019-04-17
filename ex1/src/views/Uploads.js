import React, {Component} from 'react';
import {getAllMedia, uploadFile} from "../util/MediaAPI";
import {CircularProgress, Input, TextField, Button} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Filter from "../components/Filter";



class Uploads extends Component {
  state = {
    form:{},
    isUploaded:false,
    isSent:false,
    file:null,
    sendStyle:{}
  };


  handleSubmit = (evt) => {
    evt.preventDefault();
    this.formatDescription();
    //this.setState({isSent:true});
    const newForm = new FormData();
    for (let g in this.state.form ) {
      newForm.append(g, this.state.form[g]);
    }
    uploadFile(localStorage.token, newForm).then(res => {console.log(res);}).catch(error => {console.log(error);});
    setTimeout(()=>{getAllMedia().then(result => {this.props.setPicArray(result);this.props.history.push('/');});}, 2000);
  };

  formatDescription = () => {
    const tempArr = this.state.form;
    const tempLine = "[d]"+this.state.form.description+"[/d][f]"+JSON.stringify(this.state.sendStyle)+"[/f]";
    tempArr.description = tempLine;
    this.setState({form:tempArr});
  };

  setSendStyle = (value) => {
    this.setState({sendStyle: value});
    console.log(this.state);
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
            <Button variant="outlined" component="span">
              Upload file
            </Button>
          </label>

          <br/>

          <br/>
          {this.state.isUploaded &&
            <React.Fragment>
              <Filter image={this.state.file} setSendStyle={this.setSendStyle}/>
              <br/>
            </React.Fragment>
          }
          <Button color="primary" type="submit" variant="contained" value="uploadTheMeme" name="submit">
            Upload
            <CloudUploadIcon style={{marginLeft:"5px"}}/>
          </Button>
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