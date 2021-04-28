import { useEffect, useRef } from "react";
import styled from "styled-components";

const Video = styled.video`
  height: 100%;
  width: 100%;
`;

const VideoContainer = styled.div`
  background-color: #000;
  height: 150px;
  width: 150px;
`;

export default function Component({ stream, className }) {
  const videoRef = useRef();
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = stream;
    // videoRef.current.play();
  }, [videoRef.current]);
  return (
    <VideoContainer>
      <Video autoPlay className={className} ref={videoRef} />
    </VideoContainer>
  );
}
