import React, {Component} from 'react';


class Uploads extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameOfFile: '',
      descriptionOfFile: '',
    }
  }

  handleInputChange = (evt) => {
    console.log(this.state.fragmentLogin);
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    console.log(value, name);

    this.setState(state => ({
        [name]: value,
      })
    );
  };

  render = () => {
    return(
      <form onSubmit="" method="post or get" encType="multipart/form-data">
        Select image to upload:
        <input type="text" name="nameOfFile" onChange={this.handleInputChange} placeholder="title" />
        <textarea name="descriptionOfFile" onChange={this.handleInputChange} placeholder="description" />
        <input type="file" name="fileToUpload" accept="image/*"/>
        <input type="submit" value="uploadTheMeme" name="submit"/>
      </form>
    );
  }
}

export default Uploads;