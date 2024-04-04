import { useCallback, useRef, useState } from "react";
import "./App.css";
import Webcam from "react-webcam";
import CameraCapture from "./Webcam";
// const Viewer = lazy(() => import("Viewer/Viewer"));

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment"
};

const WebcamCapture = ({setImageSrc}:any) => {
  const webcamRef = useRef(null);
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef?.current?.getScreenshot();
      console.log("imageSrc",imageSrc);
      setImageSrc(imageSrc)
      
    },
    [webcamRef]
  );
  return (
    <>
      <Webcam
        audio={false}
        height={720/4}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280/4}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
function App() {
  const [imageSrc, setImageSrc] = useState<string>("");
  return (
    <>
      <h3>Micro frontend setup</h3>
      {imageSrc && <img src={imageSrc} height={100} width={200}></img>}
      <WebcamCapture setImageSrc={setImageSrc}/>
      <CameraCapture />
    </>
  );
}

export default App;
