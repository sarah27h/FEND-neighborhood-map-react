import React, { Component } from 'react';

export class LocationFilter extends Component {

    
    render() {
  
      console.log(this.props.locations);
  
      return (
          <div className="location_filter">

            <h2>Location Filter</h2>
                <input 
                    type="text" 
                    placeholder="Search by museum name"
                    className="search_field"
                    value={this.props.query}
                    onChange={(event) => {this.props.onUpdateQuery(event.target.value)}} />
                
          </div>
      )
    }
}


export default LocationFilter;