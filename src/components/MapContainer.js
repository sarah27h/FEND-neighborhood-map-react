import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

export class MapContainer extends Component {

    state = {
        fetchedData : '',
        isLoading : false
    }

    /* 
        * This methode base on this stackoverflow question and
        * react-async-script-loader package
        * https://www.npmjs.com/package/react-async-script-loader
        *
        * https://stackoverflow.com/questions/41709765/how
        -to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require 
        * it help me to load Maps async
    */
    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed, query, fetchedData }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished

          if (isScriptLoadSucceed) {
            console.log(this.state.fetchedData);

            // create our map add its center
            let map = new window.google.maps.Map(document.getElementById('map'), { 
                center: {lat: 30.052635, lng: 31.236145},
                zoom: 12
            });

            // create infowindow to add it later to every marker when clicked
            let infowindow = new window.google.maps.InfoWindow();
            let markers = [];

            // add marker to every location
            this.props.locations.map((location, index) => {
                let marker = new window.google.maps.Marker({
                    map: map,
                    position: {lat: location.location.lat, lng: location.location.lng},
                    title: location.title,
                    id: index
                });
                
                
                // add click listener for every marker
                marker.addListener('click', () =>{
                    console.log(marker.get('id'), marker);
                    console.log(marker.title);

                    // call fecthData and pass clicked marker to fetch data based on its location
                    fecthData(marker);

                    // animate clicked marker
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);

                    // stop animation
                    setTimeout(function() { 
                        marker.setAnimation(null); 
                    }, 1500);

                })

                
                
                // add every marker to this.state.markers array
                // this.setState( prevState => (new: prevState.old.concat(marker)) )
                // this.setState( prevState => ({markers : prevState.markers.concat(marker)}) )
    
                          
                // DON'T mutate the state
                // means to update the state use setState()
                markers.push(marker);              
            })
            
            this.props.onUpdateMarkers(markers);
            
            // fetch data from FourSquare
            let fecthData = (marker) =>  {
                let address;
                let lat = marker.getPosition().lat();
                let lng = marker.getPosition().lng();
                let url = 'https://api.foursquare.com/v2/venues/search?client_id=F4JVCTXHB3C2Y1TOJFRQZEXGZI4JMGLFXF0G2ZZ10OEBFO5A&client_secret=M3K4KIBHLKEPXHU15VMWOMOAVBRGEG0M4RPX5X534HVZDRHC&ll='+ lat + ',' + lng + '&limit=1&v=20180801';
                //' + 'query=' + this.state.locations[0].title + '
                
                /*
                    * I take just that its recommended to add message 'Loading ...'
                    *  because fetch may take some time
                    * to improve user experience
                    * https://www.robinwieruch.de/react-fetching-data/
                */
                this.setState({ isLoading : true, fetchedData : 'Loading ...' }, () => {
                        makeInfoWindow(marker, infowindow);
                    }
                );
                

                //send request to fetch data from FourSquare API
                fetch(url)
                    .then( response => response.json())
                    .then(result => {

                        // store address data we want from result object
                        address = result.response.venues[0].location.formattedAddress.join(', ');

                        // handle case: if FourSquare have data we request or not
                        if (address) {
                            // update fetchedData state with data
                            this.setState({ fetchedData : address, isLoading : false });

                        } else {
                            this.setState({ fetchedData : 'Error :(' });
                        }

                        console.log(result.response.venues[0].location);
                        console.log(result.response.venues[0].location.formattedAddress.join(', '));
                        console.log(this.state.fetchedData);
                        console.log(this.state.fetchedData);

                        // pass marker and infowindow to display data
                        makeInfoWindow(marker, infowindow);
                    })
                    // handle case: if fetch request fails or network issues
                    .catch(error =>
                        //case when I delete from API key give me Cannot read property '0' of undefined
                        this.setState({ fetchedData : error.message + ' address data for this location :( try again', isLoading : false}, () => {
                                // pass marker and infowindow to display error
                                makeInfoWindow(marker, infowindow)
                            }
                        
                        ))
                
            }

            // add a changable content based on which marker is clicked
            let makeInfoWindow = (marker, infowindow) => {
                console.log(this.state.fetchedData);
                console.log(this);
                
                infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + this.state.fetchedData + '</div>');
                
                // link infowindow with map to show in and with its anchor
                infowindow.open(map, marker);
                
            }

          } else {
            // this.props.onError()
          } 
        }
      }
      
    
    render() {
        
        let filteredMarkers = [];

        console.log(this.props.locations);
        console.log(this.props.markers);
        console.log(this.props.query);

        // if(this.props.query) {
        //     const match = new RegExp(escapeRegExp(this.props.query), 'i');
        //     filteredMarkers = this.state.markers.filter( (marker) => !(match.test(marker.title)));
        //     filteredMarkers.map((marker) =>marker.setVisible(false));
  
        //     console.log(filteredMarkers);
            
        //   } else if (this.state.query === '') {
        //     filteredMarkers = this.state.markers;
        //     this.state.markers.map((marker) =>marker.setVisible(true));
        //     console.log(filteredMarkers);
        //   }
  
        return(
            <div className="mapWrapper">
                <div id="map"  onClick = {(e) => {this.props.onMarkerclick(e.target)}}>
                </div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyC8oJajiPzKCrwCSkGxQ1mnF9fMrXYGSlc&v=3"]
)(MapContainer)