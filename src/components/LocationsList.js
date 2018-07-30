import React, { Component } from 'react';

export class LocationsList extends Component {

    
    render() {
  
      console.log(this.props.locations);
  
      return (
          <div className="list_wrapper">

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


export default LocationsList;