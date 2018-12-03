import React, { Component } from 'react';

class Search extends Component {

  render() { 
    const {searchString, handleSearch} = this.props;
    return ( 
      <label>
        Search:
        <input type="text" name="search" value={searchString} onChange={(event)=> handleSearch(event)} />
      </label>
     );
  }
}
 
export default Search;