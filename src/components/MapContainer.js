import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';



export class MapContainer extends Component {

    state = {
        markers : []
    }
    
    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished

          if (isScriptLoadSucceed) {

            // create our map add its center
            let map = new window.google.maps.Map(document.getElementById('map'), { 
                center: {lat: 30.052635, lng: 31.236145},
                zoom: 12
            });

            // create infowindow to add it later to every marker when clicked
            let infowindow = new window.google.maps.InfoWindow();

            // add marker to every location
            this.props.locations.map((location) => {
            let marker = new window.google.maps.Marker({
                map: map,
                position: {lat: location.location.lat, lng: location.location.lng},
                title: location.title,
                animation: window.google.maps.Animation.Drop
            });
            
            // add click listener for every marker
            marker.addListener('click', function() {
                makeInfoWindow(this, infowindow);
            })

            // add every marker to this.state.markers array
            // this.setState( prevState => (new: prevState.old.concat(marker)) )
            this.setState( prevState => ({markers : prevState.markers.concat(marker)}) )

            // DON'T mutate the state
            // means to update the state use setState()
            // this.state.markers.push(marker)              
            })
            
            // add a changable content based on which marker is clicked
            function makeInfoWindow(marker, infowindow) {
                infowindow.setContent('<div>' + marker.title + '</div>' + '<button class="test"> View more about' + marker.title + '</button>');
                
                // link infowindow with map to show in and anchor  
                infowindow.open(map, marker);
                // infowindow.addListener('closeclick', function() {
                //     infowindow.setMarker(null);
                // })
            }

          } else {
            // this.props.onError()
          } 
        }
      }

      
    
    //   componentDidMount () {
    //     const { isScriptLoaded, isScriptLoadSucceed } = this.props
    //     if (isScriptLoaded && isScriptLoadSucceed) {
    //         this.setState({ markers : this.state.markers });
    //     }
    //   }
    
    
    render() {
        console.log(this.props.locations);
        console.log(this.state.markers);

        return(
            <div className="mapWrapper">
                <div id="map" style={{height: "600px"}}>
                </div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyC8oJajiPzKCrwCSkGxQ1mnF9fMrXYGSlc&v=3"]
)(MapContainer)