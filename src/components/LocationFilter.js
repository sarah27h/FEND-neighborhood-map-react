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
                 />
                <ol className="location_list">
                    {this.props.locations.map((location, index) =>

                        <li className="location_item" id={index} key={index} 
                            onClick={(e) => (this.props.onClicked(index, e.target))}>
                            
                            {location.title}

                        </li>
                       
                   )}
                </ol>
          </div>
      )
    }
}


export default LocationFilter;