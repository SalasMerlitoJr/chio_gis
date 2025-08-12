//import React, {useEffect, useState} from 'react';
//import {useParams} from 'react-router-dom';
//import api from '../api';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//export default function BarangayDashboard(){
//const {id} = useParams();
  //const [barangay,setBarangay] = useState(null);
  //useEffect(()=>{
    // fetch barangay data and top diagnoses
    // api.get(`/barangay/${id}/dashboard`).then(r=>setBarangay(r.data));
    //setBarangay({id, name:'Sample Barangay', lat:8.488, lng:124.654, top:[{desc:'Cough',count:12},{desc:'Diarrhea',count:8}]});
  //},[id]);
  //return (<div>
    //<h3>Barangay Dashboard #{id}</h3>
    //{barangay && (
      //<>
        //<p>Name: {barangay.name}</p>
        //<h4>Top 5 diagnoses</h4>
        //<ol>{barangay.top.map((t,i)=>(<li key={i}>{t.desc} — {t.count}</li>))}</ol>
        //<h4>Map</h4>
        //<div style={{height:400}}>
          //<MapContainer center={[barangay.lat,barangay.lng]} zoom={13} style={{height:'100%'}}>
            //<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            //<Marker position={[barangay.lat,barangay.lng]}>
              //<Popup>{barangay.name}</Popup>
            //</Marker>
          //</MapContainer>
        //</div>
      //</>
    //)}
  //</div>);
//}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

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

export default function BarangayDashboard() {
  const { id } = useParams();
  const [barangay, setBarangay] = useState(null);

  useEffect(() => {
    // fetch barangay data and top diagnoses
    setBarangay({
      id,
      name: '',
      lat: 8.488,
      lng: 124.654,
      top: [
        { desc: 'Cough', count: 12 },
        { desc: 'Diarrhea', count: 8 }
      ]
    });
  }, [id]);

  return (
    <div>
      <h3 style={{ fontWeight: 600, marginBottom: 24 }}>Barangay Dashboard {id}</h3>
      {barangay && (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Top Diagnoses</h2>
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
              {barangay.top.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "#fafbfc" : "#fff",
                    borderBottom: "1px solid #f0f0f0"
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{item.desc}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={badgeStyle}>{item.count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ color: "#888", fontStyle: "italic" }}>{barangay.name}</p>
        </>
      )}
    </div>
  );
}