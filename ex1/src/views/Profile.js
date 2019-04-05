import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const Profile = (props) => {
  const {username, email, full_name, avatar} = props.user;

  return (
      <React.Fragment>
        <h1>Profile</h1>
        <img style={{width:"200px"}} alt={"avatar"} src={avatar}/>
        <p>Username: {username}</p>
        <p>email: {email}</p>
        <p>Full name: {full_name}</p>
        <br/>
        <br/>
        <Button variant={"contained"} component={Link} to="/logout">Logout</Button>
      </React.Fragment>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;