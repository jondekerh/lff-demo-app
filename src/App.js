import React, { Component } from 'react';
import Input from './Input.js';
import Loading from './Loading.js';
import Output from './Output.js';
import './assets/css/default.min.css';
import ReactLoading from 'react-loading';
const request = require('request');
const auth = require('./auth.json');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      weight: 0,
      size: 0,
      shape: 0,
      lffRes: [],
      isHidden: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }

  // reset the app for a new search
  handleReset() {
    this.setState({isHidden: false, isLoading: false, lffRes: []});
    document.getElementById('inputForm').reset();
    document.getElementById('shape').index == 0;
  }

  // handles changes to the input fields.
  handleChange(e) {
      this.setState({[e.target.name]: parseInt(e.target.value)});
  }


  //sends request to lff api
  handleSubmit(e) {

    e.preventDefault();

    this.setState({isHidden: true, isLoading: true}, () => {

      var payload = {
        'gender': 1,
        'height': this.state.height,
        'weight': this.state.weight,
        'female_pant_size': this.state.size,
        'female_reviewer_shape': this.state.shape,
        'limit': 6
      }

      var options = {
        url: 'https://api.lookfitfeel.com/items/',
        method: 'GET',
        qs: payload,
        headers: {
          authorization: auth.key
        }
      }

      request(options, function(err, response, body) {
        if(err) { console.log(err); return; }
        console.log("Get response: " + response.statusCode);
        console.log(response);

        var lffResponse = JSON.parse(response.body);
        console.log(lffResponse); //mostly for testing, just shows the response data
        this.setState({lffRes: lffResponse});
        this.setState({isLoading: false});
      }.bind(this));

    });

  }

  //brief explination of how this rendered HTML works: by default the output (which contains no data at this point)
  //is hidden, along with the loading spinner. When the user submits their query the input fields are similarly
  //hidden, and the loading spinner is revealed during the time between the app's request and the API response
  //using the isLoading state, which is changed at the start and end of handleSubmit. Once response data comes
  //the placeholder cells are updated with the data from Output.js
  render() {
    return (
      <div className="App">
        <form id='inputForm' onSubmit={this.handleSubmit} style={{ display: (this.state.isHidden ? 'none' : '')}}>
          <p>Enter your measurements here:</p>
          <input type='text' name='height' placeholder='Height' id='height' onChange={this.handleChange}></input><br/>
          <input type='text' name='weight' placeholder='Weight' id='weight' onChange={this.handleChange}></input><br/>
          <input type='text' name='size' placeholder='Size' id='size' onChange={this.handleChange}></input><br/>
          <select name='shape' id='shape' onChange={this.handleChange}>
            <option value="" disabled selected>Body Shape</option>
            <option value="0">Rectangle</option>
            <option value="1">Hourglass</option>
            <option value="2">Triangle</option>
            <option value="3">Circle</option>
          </select><br/>
          <input type='submit' name='sendUserData' id='submitButton'></input>
        </form>
        <Loading isLoading={this.state.isLoading}/>
        <Output lffRes={this.state.lffRes}/>
        <button onClick={this.handleReset} id='resetButton' style={{ display: (this.state.isHidden ? '' : 'none')}}>
          Reset
        </button>
        <p id='note'>Note: images and prices displayed here are placeholders. In the integrated app these would be pulled from the retailer database.</p>
      </div>
    )
  }
};

export default App;
