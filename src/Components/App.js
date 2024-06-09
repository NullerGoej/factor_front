import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

function App() {
  const [action, setAction] = useState('');

  const handleTwoFactorAuthClick = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;

      await axios.post('https://accessio-api.moedekjaer.dk/two-factor-auth-request', {
        ip_address: ip,
        action: action
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="App bg-dark text-white d-flex justify-content-center align-items-center vh-100">
        <form className="bg-light p-5 rounded">
          <h2 className="mb-3 text-center text-dark">2FA Dummy Demo</h2>
          <div className="mb-3">
            <input className="form-control" type="text" value={action} onChange={e => setAction(e.target.value)} placeholder="Enter action" />
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-success w-100" onClick={handleTwoFactorAuthClick}>Submit 2FA Auth</button>
          </div>
        </form>
      </div></div>
  );
}

export default App;