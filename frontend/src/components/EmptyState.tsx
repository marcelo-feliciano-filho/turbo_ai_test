import React from "react";

const EmptyState = () => {
  return (
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>
      <img src="/cup.png" alt="No Notes Available" style={{ width: 297, height: 296 }} />
      <p style={{ fontSize: 24, color: "#88642A", marginTop: 16 }}>
        I’m just here waiting for your charming notes...
      </p>
    </div>
  );
};

export default EmptyState;
