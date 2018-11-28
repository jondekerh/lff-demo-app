import React, { Component } from 'react';
import './assets/css/default.min.css';
import StarRatingComponent from 'react-star-rating-component';


class Output extends Component {
  render() {

    const lffRes = this.props.lffRes;

    //iterate through the response and construct a mock ad for each pant returned
    var pantCells = lffRes.map(lffRes => {

      //this parses ASCII that sometimes appears in the item_name using regex
      var parsedItemName = lffRes.item_name;
      parsedItemName = parsedItemName.replace(/&#039;/gi, "'");
      parsedItemName = parsedItemName.replace(/&#reg;/gi, "");
      parsedItemName = parsedItemName.replace(/&#reg/gi, "");
      parsedItemName = parsedItemName.replace(/;/gi, "");


      //currently the returned cells are mostly placeholder values. if the app were integrated into
      //a retailer's site most of these values would be pulled from their database.
      return (
        <div className='cell'>
          <div className='image'><img src='https://ll-us-i5.wal.co/asr/3b354059-407d-43e8-9400-81b906be11db_1.6da40160f8a646b3b7e14b58af20f0e3.jpeg-04565ae4b73ff56e4540f9de4f794aedee6aaeb5-optim-282x376.jpg?odnBg=ffffff' /></div>
          <div className='price'>$29.99</div>
          <div className='item_name'><a href='#' onClick='return false;'>{parsedItemName}</a></div>
          <StarRatingComponent name='rate0' className='star_rating' starCount={5} value={lffRes.star_rating} />
          <div className='reviewsNum'>Reviews: {lffRes.reviews.length}</div>
        </div>
      )
    })

    return (
      <div className="output">
        {pantCells}
      </div>
    )
  }
};

export default Output;
