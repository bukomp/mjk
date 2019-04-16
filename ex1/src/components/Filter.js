import React, {Component} from 'react';
import Slider from '@material-ui/lab/Slider';
import {Typography, Button} from '@material-ui/core';


class Filter extends Component {
  constructor(props){
    super(props);
    this.state = {
      original: false,
      imgStyle: {
        brightness:50,
        saturation:0,
        grayScale:0
      }
    };
  }

  imgForFiltering = () => {
    const filtered= {
      filter: `brightness(${this.state.imgStyle.brightness+50}%)
              saturate(${this.state.imgStyle.saturation+50+(Math.pow((this.state.imgStyle.saturation-50), 2)/100)}%)
              grayscale(${this.state.imgStyle.grayScale}%)`,
      width:"20rem",
      maxHeight:"50vh"
    };
    const notFiltered = {
      width:"20rem",
      maxHeight:"50vh"
    }
    const style = (!this.state.original)?filtered:notFiltered;
    return (
      <img
        src={this.props.image}
        style={style}
        alt="wow"
      />
    );
  };

  RevertCss = () => {
    this.setState({original: !this.state.original});
    console.log(this.state.original);
  };

  handleBrightnessChange = (event, value) => {
    const tempArr = this.state.imgStyle;
    tempArr.brightness = value;
    this.setState({imgStyle:tempArr});
    console.log(this.state);
  };
  handleGrayScaleChange = (event, value) => {
    const tempArr = this.state.imgStyle;
    tempArr.grayScale = value;
    this.setState({imgStyle:tempArr});
    console.log(this.state);
  };
  handleSaturationChange = (event, value) => {
    const tempArr = this.state.imgStyle;
    tempArr.saturation = value;
    this.setState({imgStyle:tempArr});
    console.log(this.state);
  };

  render(){
    const { brightness, grayScale, saturation } = this.state.imgStyle;

    return(

      <div style={{width:"20rem", position:"relative"}}>
        <Button onClick={this.RevertCss} variant="contained" style={{position:"absolute", right: 10, top: 10, width:"5rem", zIndex: 200}}>{!this.state.original && "edited"}{this.state.original && "original"}</Button>

        {this.imgForFiltering()}

        <div>
          <Typography id="brightness">Brightness {brightness+50}%</Typography>
          <Slider
            step={1}
            aria-labelledby="brightness"
            value={brightness}
            disabled={this.state.original}
            onChange={this.handleBrightnessChange}
          />

          <Typography id="saturation">Saturation {saturation+50+(Math.floor(Math.pow((saturation-50), 3)/100))}%</Typography>
          <Slider
            step={1}
            aria-labelledby="saturation"
            value={saturation}
            disabled={this.state.original}
            onChange={this.handleSaturationChange}
          />

          <Typography id="grayScale">Gray Scale {grayScale}%</Typography>
          <Slider
            step={1}
            aria-labelledby="grayScale"
            value={grayScale}
            disabled={this.state.original}
            onChange={this.handleGrayScaleChange}
          />
        </div>
      </div>
    )}
}

export default Filter;