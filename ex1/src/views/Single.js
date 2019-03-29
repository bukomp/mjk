import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from "../utils/MediaAPI";
import {Nav} from "../components/nav";

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: {
      filename: 'b2db3cce51674aba84d9476a545c5cc4.jpg',
      title: 'Test',
    },
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    getSingleMedia(id).then(json => {this.setState({file: {filename: json.filename, title: json.title}})});
  }

  render() {
    return (
      <React.Fragment>
        <Nav/>
        <h1>{this.state.file.title}</h1>
        <img src={this.mediaUrl + this.state.file.filename} alt={this.state.file.title}/>
      </React.Fragment>
    );
  }
}

Single.propTypes = {
  match: PropTypes.object,
};

export {Single};