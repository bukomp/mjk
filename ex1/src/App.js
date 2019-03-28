import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {getAllMedia} from "./utils/MediaAPI";
import {Nav} from "./components/nav";
import {Home} from "./views/Home";
import {Profile} from "./views/Profile";
import {Single} from "./views/Single";

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      upLoc:"http://media.mw.metropolia.fi/wbma/uploads/",
      downLoc:"http://media.mw.metropolia.fi/wbma/media/",
      picArray: [
        {
          'title': 'Title 1',
          'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
          'thumbnails': {
            w160: 'http://placekitten.com/160/161',
          },
          'filename': 'http://placekitten.com/2048/1920',
        },
        {

          'title': 'Title 2',
          'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
          'thumbnails': {
            w160: 'http://placekitten.com/160/162',
          },
          'filename': 'http://placekitten.com/2041/1922',
        },
        {
          'title': 'Title 3',
          'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
          'thumbnails': {
            w160: 'http://placekitten.com/160/163',
          },
          'filename': 'http://placekitten.com/2039/1920',
        },
      ]
    };
  }


 componentDidMount() {
    getAllMedia().then(result => {this.setState({picArray: result})})
 }

  render() {
      return (
        <Router /*basename='/~username/school/mjk/ex1'*/>
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Nav/>
              <Home picArray={this.state.picArray} />
            </React.Fragment>
          )}/>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/single/:id" component={Single} />
        </Router>
    );
  }
}
//<Single file_id={props.picArray[props.num]["file_id"]}/>
export default App;
