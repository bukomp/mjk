import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser, getUserProfilePic} from '../util/MediaAPI';
import {Button} from '@material-ui/core/';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../util/TextValidator';


class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    full_name: '',
    passwordConfirm: '',
    user:{
      username: '',
      password: '',
      email: '',
      full_name: ''
    },
    fragmentLogin: true,
    usernameInUse: null,
    validPassword: null
  };

  handleLoginSubmit = (evt) => {
    evt.preventDefault();
    this.doLogin();
  };

  handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    register(this.state.user).then(user => {
      console.log(user);
      this.doLogin();
    });
  };

  doLogin = () => {
    login(this.state.username, this.state.password)
      /*.then( response => {
      getUserProfilePic(response.user["user_id"],response.token).then(pic => {response.user.avatar = pic});
      return response;
    })*/
      .then(response => {
      if(response.user !== undefined) {
        console.log(response);
        this.props.setUser(response.user);
        localStorage.setItem('token', response.token);
        this.props.history.push('/home');
      }
    });
  };

  handleInputChange = (evt) => {
    console.log(this.state.fragmentLogin);
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    const newUser = Object.assign({}, this.state.user);
    if(name !== "passwordConfirm")newUser[name] = value;
    console.log(value, name);

    this.setState(state => ({
        [name]: value,
        user: newUser
      })
    );

    if(target.name==="username" && this.state.password !== ""){this.checkUsernameExist(value); if(this.state.fragmentLogin === true)this.checkPassword(value, this.state.password);}
    if(target.name==="password" && this.state.fragmentLogin === true && this.state.username !== "" && this.state.password !== "")this.checkPassword(this.state.username, value);

  };

  checkPassword = (login_v,pass) => {
    console.log((login_v + pass));
    login(login_v, pass)
      .then(
        response => {
          console.log(response);
          (response.user === undefined) ? this.setState(state => ({validPassword: false})) : this.setState(state => ({validPassword: true}));
        });
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
      return this.state.usernameInUse;
    });
    ValidatorForm.addValidationRule('isUserRegisterAvailable', () => {
      return !this.state.usernameInUse;
    });
    ValidatorForm.addValidationRule('validPassword', () => {
      console.log(this.state.validPassword);
      return this.state.validPassword;
    });
    ValidatorForm.addValidationRule('confirmPassword', (value) => {
      console.log(value, this.state.user.password);
      return value===this.state.user.password;
    });
    ValidatorForm.addValidationRule('validEmail', (value) => {
      return(value.includes('@'));
    });
  }

  toggleFragment = () => {
    this.setState(state => ({
      fragmentLogin: !state.fragmentLogin
    }));
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
                  validators={["required", "validPassword"]}
                  errorMessages={["This field is required", "Check your password"]}
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
                  value={this.state.user.username}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:3", "isUserRegisterAvailable"]}
                  errorMessages={["this field is required", "username is too short",'username is not available']}
                />
                <TextValidator
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.user.password}
                  onChange={this.handleInputChange}
                  validators={["required", "minStringLength:5"]}
                  errorMessages={["this field is required", "minimal password length is 5 characters"]}
                />
                <TextValidator
                  type="password"
                  name="passwordConfirm"
                  placeholder="confirm password"
                  value={this.state.passwordConfirm}
                  onChange={this.handleInputChange}
                  validators={["required", "confirmPassword"]}
                  errorMessages={["this field is required","passwords doesn't match"]}
                />
                <TextValidator
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.user.email}
                  onChange={this.handleInputChange}
                  validators={["required", "validEmail"]}
                  errorMessages={["this field is required", 'email is not correct']}
                />
                <TextValidator
                  type="full_name"
                  name="full_name"
                  placeholder="full name"
                  value={this.state.user.full_name}
                  onChange={this.handleInputChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
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