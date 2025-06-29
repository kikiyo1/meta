// src/components/MayarFrame.jsx
import React, { useEffect, useRef } from 'react';

const MayarFrame = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://mayarembed.r2.mayar.id/mayarEmbed.min.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }} ref={containerRef}>
      <iframe
        allowFullScreen
        allow="payment"
        scrolling="no"
        frameBorder="0"
        width="100%"
        height="100%"
        src="https://sisworo-74397.myr.id/checkout/rak-minimarket-65348"
        title="Checkout Rak Minimarket"
      ></iframe>
    </div>
  );
};

export default MayarFrame;
