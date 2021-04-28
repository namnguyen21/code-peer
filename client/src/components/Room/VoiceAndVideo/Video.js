import { useEffect, useRef } from "react";
import styled from "styled-components";

const Video = styled.video`
  height: 200px;
  width: 200px;
`;

export default function Component({ stream, className }) {
  const videoRef = useRef();
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  }, [videoRef.current]);
  return <Video className={className} ref={videoRef} />;
}
