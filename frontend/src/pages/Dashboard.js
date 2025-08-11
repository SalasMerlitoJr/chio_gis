import React from 'react';
export default function Dashboard(){
  return (<div>
    <h3>City Dashboard</h3>
    <p>Top 10 diagnoses (fetched from /api/city/dashboard)</p>
    <p>Map: displays barangay centroids and patient markers (Leaflet)</p>
  </div>);
}
