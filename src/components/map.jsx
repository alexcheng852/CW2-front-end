import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'; 


export class OfficeMap extends Component {
   state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div>
      <Map google={this.props.google}
            style = {{width:"60%", height:"60%"}}
           initialCenter={{
             lat: 22.2846009,
             lng: 114.1312214
           }}
           zoom={16.75}
           onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={"Address: Shop 4, G/F, Brilliant Court, Sai Hong Lane, No.28 Praya, Kennedy Town, Hong Kong Opening Hours:10a.m. to 6p.m. Every Day"}
                position={{lat: 22.2846009,lng: 114.1312214}}/>

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
          </div>
        </InfoWindow>
      </Map><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        
<p><h1 style={{ color: "red" }}>Contact Us</h1></p>
<p>Address:</p>
<p><h4>Shop 4, G/F, Brilliant Court, Sai Hong Lane, No.28 Praya, Kennedy Town, Hong Kong</h4></p>
<p>Opening Hours:</p>
<p><h4>10a.m. to 6p.m. Every Day</h4></p>
<p>mail:</p>
<p><h4>info@hongkongdogrescue.com</h4></p>
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:"AIzaSyAmdY7ock4BdAQ0i57G77ZqhsVBEfnN3F8"
})(OfficeMap);

