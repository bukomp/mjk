import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
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
      userList:[]
    };
  }


  componentWillMount() {
    console.log(this.loadJson());
  }


  loadJson() {
    fetch(`${process.env.PUBLIC_URL}/test.json`)
      .then( response => {
        this.setState({
          userList: response.join()
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tr(num) {
    return(
      <tr key={num}>
        <td>
          <img src={this.state.picArray[num].thumbnails.w160} alt="Title"/>
        </td>
        <td>
          <h3>Title</h3>
          <p>{this.state.picArray[num].description}</p>
        </td>
        <td>
          <a href={this.state.picArray[num].filename}>View</a>
        </td>
      </tr>
    );
  }

  table() {
    let trAll = [];
    for(let i = 0; i < this.state.picArray.length; i++)
    {
      trAll.push(this.tr(i));
    }
    return(
      <table>
        <tbody>
          {this.state.userList}
        </tbody>
        <tbody>
        {trAll}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      this.table()
    );
  }
}

export default App;
