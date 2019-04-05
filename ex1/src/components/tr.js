import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Img = (props) => {
  console.log('props', props);
  const {thumbnails, screenshot, title} = props.pic;
  if (thumbnails !== null) {
    return <img src={mediaUrl + thumbnails.w160} alt={title}/>;
  } else {
    return <img src={mediaUrl + screenshot} alt={title}/>;
  }
};

const Tr = (props) => {
  const {title, description, file_id} = props.pic;
  return (
      <tr>
        <td>
          <Img pic={props.pic}/>
        </td>
        <td>
          <h3>{title}</h3>
          <p>{description}</p>
        </td>
        <td>
          <Button><Link to={'single/' + file_id} style={{color:"blue", textDecoration: "none"}}>View</Link></Button>
        </td>
      </tr>
  );
};

Tr.propTypes = {
  pic: PropTypes.object,
};
export default Tr;