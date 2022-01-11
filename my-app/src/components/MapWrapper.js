import React, { Component } from "react";
import { MapComponentCOntainer } from "./Map";

export class MapWrapper extends Component {
  render() {
    return (
      <div style={{ margin: "100px" }}>
        <MapComponentCOntainer
          google={this.props.google}
          center={{ lat: 18.5204, lng: 73.8567 }}
          height="500px"
          zoom={15}
        />
      </div>
    );
  }
}
