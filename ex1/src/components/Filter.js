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
        saturation:50,
        grayScale:0
      },
      sendStyle: {
        brightness:100,
        saturation:100,
        grayScale:0
      }
    };
  }

  imgForFiltering = () => {
    const filtered= {
      filter: `brightness(${this.state.sendStyle.brightness}%)
              saturate(${this.state.sendStyle.saturation}%)
              grayscale(${this.state.sendStyle.grayScale}%)`,
      width:"20rem",
      maxHeight:"50vh"
    };
    const notFiltered = {
      width:"20rem",
      maxHeight:"50vh"
    };
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
    const tempArr1 = this.state.imgStyle;
    const tempArr2 = this.state.sendStyle;
    tempArr1.brightness = value;
    tempArr2.brightness = value+50;
    this.setState({imgStyle:tempArr1,sendStyle:tempArr2});
    this.props.setSendStyle(tempArr2);
    console.log(this.state);
  };
  handleSaturationChange = (event, value) => {
    const tempArr1 = this.state.imgStyle;
    const tempArr2 = this.state.sendStyle;
    tempArr1.saturation = value;
    ((value+50+(Math.floor(Math.pow((value-50), 3)/100)))>=0)?tempArr2.saturation = value+50+(Math.floor(Math.pow((value-50), 3)/100)):tempArr2.saturation = 0;
    this.setState({imgStyle:tempArr1,sendStyle:tempArr2});
    this.props.setSendStyle(tempArr2);
    console.log(this.state);
  };
  handleGrayScaleChange = (event, value) => {
    const tempArr1 = this.state.imgStyle;
    const tempArr2 = this.state.sendStyle;
    tempArr1.grayScale = value;
    tempArr2.grayScale = value;
    this.setState({imgStyle:tempArr1,sendStyle:tempArr2});
    this.props.setSendStyle(tempArr2);
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