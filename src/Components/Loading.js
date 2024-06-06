import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
    React.useEffect(() => {
        setTimeout(() => {
            document.querySelector('.loading').style.opacity = '0';
        }, 100);
        setTimeout(() => {
            document.querySelector('.loading').style.display = 'none';
        }, 600);
    }, []);
    return (
        <div className="loading">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#77dd77"
                    ariaLabel="infinity-spin-loading"
                />
            </div>
        </div>
    );
};

export default Loading;