import { useEffect, useRef } from "react";

export default function Video({ stream }) {
  const videoRef = useRef();
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  }, [videoRef.current]);
  return <video ref={videoRef} />;
}
