import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import {Input, InputLabel} from '@material-ui/core/';


class TextValidator extends ValidatorComponent {

  render() {
    const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

    return (
      <div>
        <Input
          {...rest}
          ref={(r) => { this.input = r; }}
        />
        {this.errorText()}
      </div>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return (
      <InputLabel style={{ color: 'red' }}>
        {this.getErrorMessage()}
      </InputLabel>
    );
  }
}

export default TextValidator;