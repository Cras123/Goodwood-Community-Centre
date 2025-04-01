"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { Icon } from "leaflet";
const position: LatLngExpression = [-42, 146.8087]; // Default coordinates

const customIcon = new Icon({
  iconUrl: "/map/marker-icon.png", // Path to your custom icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const GoogleMapComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: "200px", // Adjust height
          width: "80%", // Adjust width
          maxWidth: "600px", // Limit max width
          margin: "auto",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>We are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GoogleMapComponent;
