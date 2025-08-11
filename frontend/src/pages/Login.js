import React, {useState} from 'react';
import api from '../api';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit = async e => { e.preventDefault(); try{ const r = await api.post('/login',{email,password}); alert('Logged in (stub)'); }catch(err){ alert('Login failed (use backend)'); }}
  return (<div><h3>Login</h3>
    <form onSubmit={submit}><input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
    <input placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} />
    <button>Login</button></form>
  </div>)
}
