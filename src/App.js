import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function App() {
  const [token, setToken] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [action, setAction] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const loginResponse = await axios.post('https://zealand.moedekjaer.dk/final/api/public/api/login', {
        email: 'test@example.com',
        password: 'password'
      });

      setToken(loginResponse.data.token);

      const qrResponse = await axios.post('https://zealand.moedekjaer.dk/final/api/public/api/two-factor-auth-setup/1', {}, {
        headers: { Authorization: `Bearer ${loginResponse.data.token}` }
      });

      setQrCode(qrResponse.data.qr_code);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTwoFactorClick = async () => {
    try {
      await axios.post('https://zealand.moedekjaer.dk/final/api/public/api/two-factor-auth-setup/2', {
        two_factor_6_digit: twoFactorCode
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTwoFactorAuthClick = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip = ipResponse.data.ip;

      await axios.post('https://zealand.moedekjaer.dk/final/api/public/api/two-factor-auth', {
        ip_address: ip,
        action: action
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutClick = () => {
    axios.get('https://zealand.moedekjaer.dk/final/api/public/api/logout', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => {
      localStorage.removeItem('token');
      navigate('/login');
    }).catch(() => {
      console.log('Failed to logout');
      navigate('/login');
    });

  };

  return (
    <div>
      <Header />
      <div className="App bg-dark text-white d-flex justify-content-center align-items-center vh-100">
        <form className="bg-light p-5 rounded">
          <h2 className="mb-3 text-center text-dark">2FA Demo</h2>
          <div className="mb-3">
            <button type="button" className="btn btn-success w-100" onClick={handleLoginClick}>Login and Setup 2FA</button>
          </div>
          {qrCode && <QRCode className="d-block mx-auto mb-3" value={qrCode} />}
          <div className="mb-3">
            <input className="form-control" type="text" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} placeholder="Enter 2FA Code" />
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-success w-100" onClick={handleTwoFactorClick}>Submit 2FA Code</button>
          </div>
          <div className="mb-3">
            <input className="form-control" type="text" value={action} onChange={e => setAction(e.target.value)} placeholder="Enter action" />
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-success w-100" onClick={handleTwoFactorAuthClick}>Submit 2FA Auth</button>
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-danger w-100" onClick={handleLogoutClick}>Logout</button>
          </div>
        </form>
      </div></div>
  );
}

export default App;