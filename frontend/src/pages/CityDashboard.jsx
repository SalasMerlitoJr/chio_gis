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

const badgeStyle = {
  display: 'inline-block',
  padding: '2px 12px',
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '0.95em',
  background: '#e8f5e9',
  color: '#388e3c',
  border: '1px solid #c8e6c9',
};

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
      <h1>Cagayan de Oro City Dashboard</h1>

      {/* Diagnoses Table */}
      <h2 style={{ textAlign: 'center' }}>Top 10 Diagnoses</h2>
      <table
        style={{
          borderCollapse: "separate",
          borderSpacing: 0,
          width: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 24
        }}
      >
        <thead>
          <tr style={{ background: "#f5f6fa" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Diagnosis</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Cases</th>
          </tr>
        </thead>
        <tbody>
          {diagnoses.map((item, index) => (
            <tr
              key={index}
              style={{
                background: index % 2 === 0 ? "#fafbfc" : "#fff",
                borderBottom: "1px solid #f0f0f0"
              }}
            >
              <td style={{ padding: "12px 16px" }}>{item.diagnosis}</td>
              <td style={{ padding: "12px 16px" }}>
                <span style={badgeStyle}>{item.count}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "20px" }}>Cagayan de Oro City Map</h2>
      <MapContainer
        center={[8.4542, 124.6319]} // Cagayan de Oro City center
        zoom={12.5} // Slightly closer city view
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Barangay Centroids */}
        {barangays.map((b, idx) => (
          <Marker key={idx} position={[b.lat, b.lng]}>
            <Popup>
              <strong>{b.name}</strong>
              <br />
              Barangay Center
            </Popup>
          </Marker>
        ))}

        {/* Patient Markers */}
        {patients.map((p, idx) => (
          <Marker key={idx} position={[p.lat, p.lng]}>
            <Popup>
              <strong>{p.name}</strong>
              <br />
              Diagnosis: {p.diagnosis}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CityDashboard;