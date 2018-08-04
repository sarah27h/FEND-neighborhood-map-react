import React, { Component } from 'react';

function LocationFilter (props) {

    return (
        <div className="location_filter">

        <h3>Museums Guide</h3>
            <input 
                type="text" 
                placeholder="Search by museum name"
                className="search_field"
                value={props.query}
                onChange={(event) => {props.onUpdateQuery(event.target.value)}} />
            
        </div>
    )
    
}


export default LocationFilter;