import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser} from '../util/MediaAPI';
import {Button} from '@material-ui/core/';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../util/TextValidator';


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
      if(response.user !== undefined) {
        console.log(response);
        this.props.setUser(response.user);
        localStorage.setItem('token', response.token);
        this.props.history.push('/home');
      }
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

    console.log("1");
    if(name==="username")this.checkUsernameExist(value);

  };

  checkUsernameExist = (name) => {
    fetch("http://media.mw.metropolia.fi/wbma/users/username/" + name)
      .then(result => result.json())
      .then(json => {
        console.log(json);
        this.setState(state => ({usernameInUse: !json.available}));
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

    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      return value === this.state.password;
    });
    ValidatorForm.addValidationRule('isUserAvailable', () => {
      console.log("2");
      console.log(this.state.usernameInUse+"   "+this.state.username);
      return this.state.usernameInUse;

    });
    /*ValidatorForm.addValidationRule('isUserNotAvailable', () => {
      this.checkUsernameExist();
    });*/
  }

  toggleFragment = () => {
    this.setState(state => ({
      fragmentLogin: !state.fragmentLogin
    }));
  };

  handleInputBlur = () => {

    this.checkUsernameExist();
    //console.log(this.state.usernameInUse);

  };

  render() {
    return (
        <React.Fragment>
          {this.state.fragmentLogin &&
            <React.Fragment>
              <h1>Login</h1>
              <ValidatorForm
                ref={this.form}
                instantValidate={false}
                onSubmit={this.handleLoginSubmit}
                onError={errors => console.log(errors)}
              >

                <TextValidator
                  placeholder="username"
                  name="username"
                  type="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:3", "isUserAvailable"]}
                  errorMessages={["this field is required", "username is too short",'username is not available']}
                />
                <TextValidator
                  placeholder="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

                <br/>
                <br/>
                <Button variant={"contained"} type="submit">Login</Button>
                <Button variant={"text"} style={{marginLeft:"2rem"}} onClick={this.toggleFragment}>No account yet?</Button>
              </ValidatorForm>
            </React.Fragment>
          }
          {!this.state.fragmentLogin &&
            <React.Fragment>
              <h1>Register</h1>
              <ValidatorForm
                ref={this.form}
                instantValidate={false}
                onSubmit={this.handleRegisterSubmit}
                onError={errors => console.log(errors)}
              >

                <TextValidator
                  placeholder="username"
                  name="username"
                  type="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:3"]}
                  errorMessages={["this field is required", "username is too short",'username is not available']}
                />
                <TextValidator
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:3"]}
                  errorMessages={["this field is required", "username is too short",'username is not available']}
                />
                <TextValidator
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:3"]}
                  errorMessages={["this field is required", "username is too short",'username is not available']}
                />
                <TextValidator
                  type="full_name"
                  name="full_name"
                  placeholder="full name"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:3"]}
                  errorMessages={["this field is required", "username is too short",'username is not available']}
                />
                <br/>
                <br/>
                <Button variant={"contained"} type="submit">Register</Button>
                <Button variant={"text"} style={{marginLeft: "2rem"}} onClick={this.toggleFragment}>Back to logging in</Button>
              </ValidatorForm>
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