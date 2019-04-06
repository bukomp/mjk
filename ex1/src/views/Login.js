import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser} from '../util/MediaAPI';
import {Button, Input, InputLabel} from '@material-ui/core/';


class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    full_name: '',
    fragmentLogin: true,
    usernameInUse: null
  };

  handleLoginSubmit = (evt) => {
    evt.preventDefault();
    this.doLogin();
  };

  handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    register(this.state).then(user => {
      console.log(user);
      this.doLogin();
    });
  };

  doLogin = () => {

    login(this.state.username, this.state.password).then(response => {


      console.log(response);
      this.props.setUser(response.user);
      localStorage.setItem('token', response.token);
      this.props.history.push('/home');
    });
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== null) {
      getUser(localStorage.getItem('token')).then(response => {
        this.props.setUser(response);
        this.props.history.push('/home');
      });
    }
  }

  toggleFragment = () => {
    this.setState(state => ({
      fragmentLogin: !state.fragmentLogin
    }));
  };

  handleInputBlur = () => {

    (this.state.username !== ""&&!null)?fetch("http://media.mw.metropolia.fi/wbma/users/username/" + this.state.username)
      .then(result => result.json())
      .then(json => {
        console.log(json);
        (json.available)?this.setState(state => ({usernameInUse: false})):this.setState(state => ({usernameInUse: true}));
      }):this.setState(state => ({usernameInUse: null}));

  };

  render() {
    return (
        <React.Fragment>
          {this.state.fragmentLogin &&
            <React.Fragment>
              <h1>Login</h1>
              <form onSubmit={this.handleLoginSubmit}>
                <Input type="text" name="username" placeholder="username"
                       value={this.state.username}
                       onChange={this.handleInputChange}/>
                <br/>
                <Input type="password" name="password" placeholder="password"
                       value={this.state.password}
                       onChange={this.handleInputChange}/>
                <br/>
                <br/>
                <Button variant={"contained"} type="submit">Login</Button>
                <Button variant={"text"} style={{marginLeft:"2rem"}} onClick={this.toggleFragment}>No account yet?</Button>
              </form>
            </React.Fragment>
          }
          {!this.state.fragmentLogin &&
            <React.Fragment>
              <h1>Register</h1>
              <form onSubmit={this.handleRegisterSubmit}>
                <Input id="my-input" type="text" name="username" placeholder="username"
                       value={this.state.username}
                       onChange={this.handleInputChange}
                       onBlur={this.handleInputBlur}
                />
                <InputLabel label="Error" htmlFor="my-input" style={{marginLeft: "2rem", color: "#d53131"}}>{this.state.usernameInUse && "Sorry, but this username is already in use."}{!this.state.usernameInUse && (this.state.usernameInUse!==null) && "✅"}</InputLabel>
                <br/>
                <Input type="password" name="password" placeholder="password"
                       value={this.state.password}
                       onChange={this.handleInputChange}/>
                <br/>
                <Input type="email" name="email" placeholder="email"
                       value={this.state.email}
                       onChange={this.handleInputChange}/>
                <br/>
                <Input type="text" name="full_name" placeholder="full name"
                       value={this.state.full_name}
                       onChange={this.handleInputChange}/>
                <br/>
                <br/>
                <Button variant={"contained"} type="submit">Register</Button>
                <Button variant={"text"} style={{marginLeft: "2rem"}} onClick={this.toggleFragment}>Back to logging in</Button>
              </form>
            </React.Fragment>
          }
        </React.Fragment>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.object,
};

export default Login;