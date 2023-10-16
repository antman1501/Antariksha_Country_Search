// LoadingScreen.js
import React from 'react';
import ReactLoading from 'react-loading';

const LoadingScreen = (props) => {
  return (
    <div className="loading-screen">
      <ReactLoading type='spin' color={props.dark?'white':'hsl(200, 15%, 8%)'} height='10vh' width='10vw'></ReactLoading>
      <div className='loading-text' style={{color:props.dark?'white':'hsl(200, 15%, 8%)'}}>Loading</div>
    </div>
  );
};

export default LoadingScreen;
