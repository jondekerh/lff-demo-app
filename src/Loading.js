import React, { Component } from 'react';
import './assets/css/default.min.css';
import ReactLoading from 'react-loading';


class Loading extends Component {
  render() {
    return(
      <div className="loading">
      {/*the following two statements are for displaying the loading screen while the api call is being made*/}
      {this.props.isLoading ? <div className='loadingAnimation'>
                                <ReactLoading type={'spin'} color={'#0066cc'} height={50} width={50} />
                              </div> : null}
      {this.props.isLoading ? <div>
                                <p>Getting your personalized matches...</p>
                              </div> : null}
      </div>
    )
  }
};

export default Loading;
