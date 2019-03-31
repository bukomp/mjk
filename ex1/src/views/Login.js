import React, {Component} from 'react';

class Login extends Component{
  state = {
    username:"",
    password:"",
    email:"",
    full_name:"",
  };

  userLogin() {
    return(
      <form action="">
        LOGIN


        username
        <input type="text" name="username" value={this.state.username}
               onChange={this.handleInputChange}/>
        password
        <input type="text" name="password" value={this.state.username}
               onChange={this.handleInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

  userRegister() {
    return(
      <form action="">
        REGISTER


        username
        <input type="text" name="username" value={this.state.username}
               onChange={this.handleInputChange}/>
        password
        <input type="text" name="password" value={this.state.username}
               onChange={this.handleInputChange}/>
        email
        <input type="text" name="email" value={this.state.username}
               onChange={this.handleInputChange}/>
        name
        <input type="text" name="name" value={this.state.username}
               onChange={this.handleInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

  handleInputChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState({
      [name]: value,
    });
  };

  render(){
    return(
      <React.Fragment>
        {this.userLogin()}
        <br/>
        {this.userRegister()}
      </React.Fragment>
    );
  }
}

export default Login;