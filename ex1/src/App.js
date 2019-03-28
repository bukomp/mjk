import React, { Component } from 'react';
import './App.css';
import {getAllMedia} from "./utils/MediaAPI";
import {Nav} from "./components/nav";

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
      ],
      jsonArr: []
    };
  }


 componentWillMount() {
    getAllMedia().then(result => {this.setState({jsonArr: result})})
 }

  tr(num) {
    return(
      <tr key={num}>
        <td>
          <img src={this.state.upLoc+this.state.jsonArr[num].filename} width={250} alt="Title"/>
        </td>
        <td>
          <h3>{this.state.jsonArr[num].title}</h3>
          <p>{this.state.jsonArr[num].description}</p>
        </td>
        <td>
          <a href={this.state.upLoc+this.state.jsonArr[num].filename}>View</a>
        </td>
      </tr>
    );
  }

  table() {
    let trAll = [];
    for(let i = 0; i < this.state.jsonArr.length; i++)
    {
      trAll.push(this.tr(i));
    }
    return(

      <table>
        <tbody>
          {trAll}
        </tbody>
      </table>
    );
  }

  render() {
      return (
        <React.Fragment>
          <Nav/>
          {this.table()}
        </React.Fragment>
    );
  }
}

export default App;
