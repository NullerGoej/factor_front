import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Setup1() {
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      axios.post('https://accessio-api.moedekjaer.dk/two-factor-auth-setup/1', {}, {
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

  // every 2 seconds, check if the user has scanned the QR code
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('https://accessio-api.moedekjaer.dk/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then((response) => {
        if (response.data.user.phone === 0) {
          navigate('/setup-1');
        } else if (response.data.user.phone === 1) {
          navigate('/setup-2');
        } else {
          navigate('/');
        }
      }).catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    }, 2000);

    return () => clearInterval(interval);
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

export default Setup1;