import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

function App() {
  const [token, setToken] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');

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
        action: 'Doing Stuff' // replace with actual action
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <button onClick={handleLoginClick}>Login and Setup 2FA</button>
      {qrCode && <QRCode value={qrCode} />}
      <input type="text" value={twoFactorCode} onChange={e => setTwoFactorCode(e.target.value)} />
      <button onClick={handleTwoFactorClick}>Submit 2FA Code</button>
      <button onClick={handleTwoFactorAuthClick}>Submit 2FA Auth</button>
    </div>
  );
}

export default App;