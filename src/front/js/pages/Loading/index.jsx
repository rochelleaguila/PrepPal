import React from 'react';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Recipe being generated...</h2>
        {/* add a spinner or any loading animation here */}
      </div>
    </div>
  );
};

export default Loading;
