//import React from 'react';
//export default function Dashboard(){
  //return (<div>
    //<h3>City Dashboard</h3>
    //<p>shiela marie ramos (fetched from /api/city/dashboard)</p>
    //<p>Map: displays barangay centroids and patient markers (Leaflet)</p>
  //</div>);
//}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CityDashboard = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [patients, setPatients] = useState([]);

  // Fetch top diagnoses
  useEffect(() => {
    axios.get("/api/city/dashboard")
      .then(res => setDiagnoses(res.data))
      .catch(err => console.error("Error fetching diagnoses:", err));
  }, []);

  // Fetch barangays & patients
  useEffect(() => {
    axios.get("/api/barangays")
      .then(res => setBarangays(res.data))
      .catch(err => console.error("Error fetching barangays:", err));

    axios.get("/api/patients")
      .then(res => setPatients(res.data))
      .catch(err => console.error("Error fetching patients:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1><c>City Dashboard</c></h1>

      {/* Diagnoses Table */}
      <h2>Top 10 Diagnoses</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Diagnosis</th>
            <th>Cases</th>
          </tr>
        </thead>
        <tbody>
          {diagnoses.map((item, index) => (
            <tr key={index}>
              <td>{item.diagnosis}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Map */}
      <h2 style={{ marginTop: "20px" }}>City Map</h2>
      <MapContainer center={[8.4542, 124.6319]} zoom={12} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Barangay Centroids */}
        {barangays.map((b, idx) => (
          <Marker key={idx} position={[b.lat, b.lng]}>
            <Popup>
              <strong>{b.name}</strong><br />
              Barangay Center
            </Popup>
          </Marker>
        ))}

        {/* Patient Markers */}
        {patients.map((p, idx) => (
          <Marker key={idx} position={[p.lat, p.lng]}>
            <Popup>
              <strong>{p.name}</strong><br />
              Diagnosis: {p.diagnosis}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CityDashboard;
