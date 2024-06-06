import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

function App() {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      axios.post('https://zealand.moedekjaer.dk/final/api/public/api/two-factor-auth-setup/1', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then((qrResponse) => {
          setQrCode(qrResponse.data.qr_code);
        })
        .catch((error) => {
          console.error('Failed to fetch QR code:', error);
        });
    };

    fetchQrCode();
  }, []);

  return (
    <div>
      <Header />
      <div className="App bg-dark text-white d-flex justify-content-center align-items-center vh-100">
        <form className="bg-light p-5 rounded">
          <h2 className="mb-3 text-center text-dark">Scan QR Code</h2>
          {qrCode && <QRCode className="d-block mx-auto mb-3" value={qrCode} />}
        </form>
      </div>
    </div>
  );
}

export default App;