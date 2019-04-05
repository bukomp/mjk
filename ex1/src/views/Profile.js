import React from 'react';
import PropTypes from 'prop-types';
import {getUserProfilePic} from "../util/MediaAPI";

const Profile = (props) => {
  const {username, email, full_name, user_id} = props.user;

  const prfPic=() => {
    let tempArr;
    return getUserProfilePic(user_id, localStorage.token).then((json)=>{
      tempArr=json;
      }).then(()=>{
        let pic;
        for(let g of tempArr){
        if(g["user_id"] === user_id) pic = 'http://media.mw.metropolia.fi/wbma/'+"/media/"+g["file_id"];
        }
        return pic;
      console.log(pic);
    });
  };
  return (
      <React.Fragment>
        <img src={prfPic().then((pic)=>{return pic})}/>
        <h1>Profile</h1>
        <p>Username: {username}</p>
        <p>email: {email}</p>
        <p>Full name: {full_name}</p>
      </React.Fragment>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
};

export default Profile;