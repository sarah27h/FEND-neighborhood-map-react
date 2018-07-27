import React, { Component } from 'react';

import scriptLoader from 'react-async-script-loader';



export class MapContainer extends Component {

    
    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
          if (isScriptLoadSucceed) {
            let map = new window.google.maps.Map(document.getElementById('map'), { 
                center: {lat: 30.052635, lng: 31.236145},
                zoom: 12
             });

             this.props.locations.map((location) => {
                let title=location.title;
                let position={lat: location.location.lat, lng: location.location.lng};
                console.log(title, position);
                let marker = new window.google.maps.Marker({
                    map: map,
                    position: position,
                    title: title,
                    animation: window.google.maps.Animation.Drop
                })
             })
             

          }
          else this.props.onError()
        }
      }
    
    //   componentDidMount () {
    //     const { isScriptLoaded, isScriptLoadSucceed } = this.props
    //     if (isScriptLoaded && isScriptLoadSucceed) {
    //       this.initEditor()
    //     }
    //   }
    
    
    render() {
        console.log(this.props.locations);

        return(
            <div>
                <div id="map" style={{height: "600px"}}>
                </div>
            </div>
        )
    }
}




export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyC8oJajiPzKCrwCSkGxQ1mnF9fMrXYGSlc&v=3"]
)(MapContainer)