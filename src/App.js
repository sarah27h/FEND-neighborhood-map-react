import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import LocationFilter from './components/LocationFilter'
import LocationsList from './components/LocationsList'

class App extends Component {

  state = {
    locations : [
      {title: 'Egyptian Museum', location: {lat: 30.048218, lng: 31.233628}},
      {title: 'Papyrus Museum', location: {lat: 29.990026, lng: 31.148380}},
      {title: 'Coptic Museum', location: {lat: 30.006382, lng: 31.230183}},
      {title: 'Museum of Islamic Art', location: {lat: 30.044696, lng: 31.252347}},
      {title: 'Child Museum', location: {lat: 30.102544, lng: 31.336957}},
      {title: 'Mohamed Ali Palace', location: {lat: 30.027732, lng: 31.228968}},
      {title: 'Om Kalthoum Museum', location: {lat: 30.007673, lng: 31.225282}},
      {title: 'Cheops Boat Museum', location: {lat: 29.978258, lng: 31.134607}},
      {title: 'Imhotep Museum', location: {lat: 29.870606, lng: 31.225019}},
      {title: 'Agricultural Museum', location: {lat: 30.046214, lng: 31.210697}},
      {title: 'Abdeen Palace Museum', location: {lat: 30.043375, lng: 31.247780}},
      {title: 'Gayer Anderson Museum', location: {lat: 30.028609, lng: 31.250744}},
      {title: 'Museum of Egyptian Modern Art', location: {lat: 30.043884, lng: 31.224628}},
      {title: 'Mahmoud Moukhtar Museum', location: {lat: 30.040948, lng: 31.222923}},
      {title: 'National Military Museum', location: {lat: 30.034995, lng: 31.261564}}
    ],
    clickedLi : undefined,
    query: ''
  }

  markerclicked = (target) => {
      console.log(target);  
  }

updateQuery = (query) => {
  this.setState({query : query},
  )
}

  handleClickedLi = (index, target) => {
    this.setState({clickedLi : index, clickedLi : target.id}, () => {
      console.log(target);
      console.log(`clicked li index is ${index}`);
      console.log(target.id);
      console.log(document.getElementById('gmimap' + this.state.clickedLi.toString()));
      //simulate click on marker to open infowindow
      document.getElementById('gmimap' + this.state.clickedLi.toString()).children[0].click();                             
    })
}

  render() {

        return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title">Museum Guide</h1>
        </header> */}
        <MapContainer 
          locations={this.state.locations}
          clickedLi={this.state.clickedLi}
          onMarkerclick={this.markerclicked}
        />

        <div className="locations_section">

          <LocationFilter 
            onUpdateQuery={this.updateQuery}
            query={this.state.query}
          />

          <LocationsList 
            locations={this.state.locations}
            onClicked={this.handleClickedLi}
            clicked={this.props.clicked}
          />

        </div>
        

      </div>
    );
  }
}

export default App;
