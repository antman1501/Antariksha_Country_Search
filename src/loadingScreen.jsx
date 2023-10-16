// LoadingScreen.js
import React from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <ReactLoading type='spin' color='black' height='10vh' width='10vw'></ReactLoading><h2>Loading</h2>
    </div>
  );
};

export default LoadingScreen;
