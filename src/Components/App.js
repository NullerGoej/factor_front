import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

function App() {
  const [action, setAction] = useState('');
  const [accepted, setAccepted] = useState([]);
  const [uniqueIds, setUniqueIds] = useState([]);
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  const handleTwoFactorAuthClick = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;

      const response = await axios.post('https://accessio-api.moedekjaer.dk/two-factor-auth-request', {
        ip_address: ip,
        action: action
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setUniqueIds(prev => [...prev, response.data.unique_id]);
      setVisibleAlerts(prev => [...prev, true]);
    } catch (error) {
      console.error(error);
    }
  };

  const checkTwoFactorAuthStatus = async () => {
    try {
      for (const uniqueId of uniqueIds) {
        const response = await axios.post('https://accessio-api.moedekjaer.dk/two-factor-auth-request-web', {
          unique_id: uniqueId
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setAccepted(prev => {
          const existingIndex = prev.findIndex(item => item.uniqueId === uniqueId);
          const newItem = {
            uniqueId: uniqueId,
            accepted: response.data.accepted,
            action: response.data.action,
            ip_address: response.data.ip_address
          };

          if (existingIndex >= 0) {
            const updatedAccepted = [...prev];
            updatedAccepted[existingIndex] = newItem;
            return updatedAccepted;
          } else {
            return [...prev, newItem];
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (index) => {
    const updatedVisibility = [...visibleAlerts];
    updatedVisibility[index] = false;
    setVisibleAlerts(updatedVisibility);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (uniqueIds.length > 0 && visibleAlerts.includes(true)) { // Only check if there are visible alerts
        checkTwoFactorAuthStatus();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [uniqueIds, visibleAlerts]);

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
          {/* Display the accepted value, action, and IP address for each item */}
          {accepted.map((item, index) => (
  visibleAlerts[index] && (
    <div key={index} className="alert alert-info" role="alert" style={{ position: 'relative', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', padding: '20px', borderRadius: '5px' }}>
      <p>Action: {item.action}</p>
      <p>IP Address: {item.ip_address}</p>
      <p>Accepted: {item.accepted ? 'Yes' : 'No'}</p>
      <button 
        onClick={() => handleClose(index)} 
        style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', border: 'none', background: 'transparent', fontSize: '30px', lineHeight: '30px' }}>
        &times;
      </button>
    </div>
  )
))}
        </form>
      </div>
    </div>
  );
}

export default App;