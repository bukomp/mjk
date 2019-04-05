import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {getAllMedia} from './util/MediaAPI';
import Front from './views/Front';
import Single from './views/Single';
import Nav from './components/Nav';
import Login from './views/Login';
import Profile from './views/Profile';
import Logout from './views/Logout';

class App extends Component {

  state = {
    picArray: [],
    user: null,
  };

  setUser = (user, avatar) => {
    this.setState({user, avatar});
  };



  checkLogin = () => {
    return this.state.user !== null;
  };

  componentDidMount() {
    getAllMedia().then((pics) => {
      //console.log(pics);
      console.log(this.state.user);
      this.setState({picArray: pics});
    });
  }

  render() {
    return (
        <Router basename='/~edvards/school/mjk/ex1'>
          <div className='container'>
            <Nav checkLogin={this.checkLogin}/>
            <Route  path="/home" render={(props) => (
                <Front {...props} picArray={this.state.picArray}/>
            )}/>

            <Route path="/single/:id" component={Single}/>

            <Route path="/profile" render={(props) => (
                <Profile {...props} user={this.state.user} avatar={this.state.avatar}/>
            )}/>

            <Route exact path="/" render={(props) => (
                <Login {...props} setUser={this.setUser}/>
            )}/>

            <Route path="/logout" render={(props) => (
                <Logout {...props} setUser={this.setUser}/>
            )}/>
          </div>
        </Router>
    );
  }
}

export default App;
