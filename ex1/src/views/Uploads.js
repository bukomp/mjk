import React, {Component} from 'react';


class Login extends Component {
  render = () => {
    return(
      <form action="" method="" encType="multipart/form-data">
        Select image to upload:
        <input type="text" name="nameOfFile" placeholder="title" />
        <textarea name="descriptionOfFile" placeholder="description" />
        <input type="file" name="fileToUpload"/>
        <input type="submit" value="Upload Image" name="submit"/>
      </form>
    );
  }
}