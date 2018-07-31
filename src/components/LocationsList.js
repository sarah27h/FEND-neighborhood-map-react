import React, { Component } from 'react';

export class LocationsList extends Component {

    
    render() {
  
      console.log(this.props.locations);
  
      if(this.props.query  && this.props.filteredLocations.length !== 0) {
        
            return (
                <div className="list_wrapper">
                        
                        <ol className="location_list">
                            {this.props.filteredLocations.map((location, index) =>

                                <li className="location_item" id={index} key={index} 
                                    onClick={(e) => (this.props.onClicked(index, e.target))}>
                                    
                                    {location.title}

                                </li>
                            
                        )}
                        </ol>

                </div>
            )
        } else if(this.props.query && this.props.filteredLocations.length === 0) {

            return (
                <div className="list_wrapper">
                        
                    <p className="infoMessage">No matched location found.</p>

                </div>
            )

        } else {

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
}


export default LocationsList;