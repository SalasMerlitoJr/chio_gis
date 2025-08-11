import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
export default function BarangayDashboard(){
  const {id} = useParams();
  const [barangay,setBarangay] = useState(null);
  useEffect(()=>{
    // fetch barangay data and top diagnoses
    // api.get(`/barangay/${id}/dashboard`).then(r=>setBarangay(r.data));
    setBarangay({id, name:'Sample Barangay', lat:8.488, lng:124.654, top:[{desc:'Cough',count:12},{desc:'Diarrhea',count:8}]});
  },[id]);
  return (<div>
    <h3>Barangay Dashboard #{id}</h3>
    {barangay && (
      <>
        <p>Name: {barangay.name}</p>
        <h4>Top 5 diagnoses</h4>
        <ol>{barangay.top.map((t,i)=>(<li key={i}>{t.desc} — {t.count}</li>))}</ol>
        <h4>Map</h4>
        <div style={{height:400}}>
          <MapContainer center={[barangay.lat,barangay.lng]} zoom={13} style={{height:'100%'}}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={[barangay.lat,barangay.lng]}>
              <Popup>{barangay.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </>
    )}
  </div>);
}
