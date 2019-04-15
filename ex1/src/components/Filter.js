import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';


class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render(){
    return(
      <div>
        <img src={this.props.image} alt="wow" />
        <div>
          <Typography id="brightness">Slider label</Typography>
          <Slider/>

          <Typography id="bAndWhite">Slider label</Typography>
          <Slider/>

          <Typography id="">Slider label</Typography>
          <Slider/>
        </div>
      </div>
    )}
}

export default Filter;