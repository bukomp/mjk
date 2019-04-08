import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, List, ListItem} from '@material-ui/core/';

const Nav = (props) => {
  return (
      <nav>
        <List style={{listStyle:"none", display: "flex"}}>

          <ListItem>
            <Button variant="text" component={Link} to="/home">Home</Button>
          </ListItem>
          {props.checkLogin() &&
          <React.Fragment>
            <ListItem>
              <Button variant={"text"} component={Link} to="/profile">Profile</Button>
            </ListItem>
            <ListItem>
              <Button variant={"text"} component={Link} to="/logout">Logout</Button>
            </ListItem>
          </React.Fragment>
          }
          {!props.checkLogin() &&
          <ListItem>
            <Button variant={"text"} component={Link} to="/">Login</Button>
          </ListItem>
          }
        </List>
      </nav>
  );
};

Nav.propTypes = {
  checkLogin: PropTypes.func,
};

export default Nav;