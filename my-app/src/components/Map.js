import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { saveSelectedPlace } from "../Actions/maps";
import { connect } from "react-redux";
import { ApiKey } from "./mockConfig";

export class MapsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }

  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState({
          address: address ? address : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  onInfoWindowClose = (e) => {};

  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    this.props.saveSelectedPlace({
      address: address,
      lat: latValue,
      lang: lngValue,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.address !== state.address) {
      return {
        address: props.address,
      };
    }
  }

  render() {
    const MapsComp = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* displaing address in info box */}
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>

          <Marker
            google={this.props.google}
            name={"Assignment Test"}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
          {/* Search Box */}
          <Autocomplete
            style={{
              width: "70%",
              height: "50px",
              paddingLeft: "20px",
              marginTop: "16px",
              marginBottom: "500px",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <MapsComp
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${ApiKey}&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

export const mapStateToProps = (state) => {
  return {
    lat: state.map.lat,
    lang: state.map.lang,
    address: state.map.address,
  };
};

export const mapDispatchToProps = {
  saveSelectedPlace: saveSelectedPlace,
};

export const MapComponentCOntainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapsComponent);
