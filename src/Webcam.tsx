import React, { useState, useRef } from 'react';

const CameraCapture = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);

  const handleCapture = async () => {
    const constraints = {
      video: true,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const handleCaptureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 100;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageUrl = canvas.toDataURL('image/jpeg');
    console.log("imageUrl",imageUrl);
    
    setImageSrc(imageUrl);
  };

  return (
    <div>
      <button onClick={handleCapture}>Open Camera</button>
      <button onClick={handleCaptureImage}>Capture Image</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
      <video ref={videoRef} autoPlay muted style={{ display: 'block', width: 300, height:200 }} />
    </div>
  );
};

export default CameraCapture;
