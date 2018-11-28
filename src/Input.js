import React, { Component } from 'react';
import './assets/css/default.min.css';


class Input extends Component {
  render() {
    return(
      <form id='inputForm' onSubmit={this.props.handleSubmit} style={{ display: (this.props.isHidden ? 'none' : '')}}>
        <p>Enter your measurements here:</p>
        <input type='text' name='height' placeholder='Height' id='height' onChange={this.props.handleChange}></input><br/>
        <input type='text' name='weight' placeholder='Weight' id='weight' onChange={this.props.handleChange}></input><br/>
        <input type='text' name='size' placeholder='Size' id='size' onChange={this.props.handleChange}></input><br/>
        <select name='shape' id='shape' onChange={this.props.handleChange}>
          <option value="" disabled selected>Body Shape</option>
          <option value="0">Rectangle</option>
          <option value="1">Hourglass</option>
          <option value="2">Triangle</option>
          <option value="3">Circle</option>
        </select><br/>
        <input type='submit' name='sendUserData' id='submitButton'></input>
      </form>
    )
  }
};

export default Input;
