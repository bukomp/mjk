import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';


class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgStyle: {}
    };
  }

  componentDidMount() {

  }

  handleCssChange = (e) => {
    const target = e.target;
    const tempArr = this.state.imgStyle;
    tempArr[target.name] = target.value;
    console.log(this.state);
    this.setState({imgStyle:tempArr});

  };

  render(){
    return(
      <div>
        <img src={this.props.image} alt="wow" />
        <div>
          <Typography id="brightness">Brightness</Typography>
          <Slider
            name="brightness"
            value={this.state.imgStyle.brightness}
            onChange={this.handleChange}
          />

          <Typography id="grayScale">Gray Scale</Typography>
          <Slider
            name="grayScale"
            value={this.state.imgStyle.grayScale}
            onChange={this.handleChange}
          />

          <Typography id="saturation">Saturation</Typography>
          <Slider
            name="saturation"
            value={this.state.imgStyle.saturation}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )}
}

export default Filter;