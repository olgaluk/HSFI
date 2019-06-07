import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAKLF1CrJOVslASd1fyR_rm_NImI9QOvP0",
    loadingElement: <div style={{ height: `100%`, width: `80%` }} />,
    containerElement: <div style={{ height: `400px`, width: `80%` }} />,
    mapElement: <div style={{ height: `100%`, width: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {<Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
)

export default MyMapComponent;