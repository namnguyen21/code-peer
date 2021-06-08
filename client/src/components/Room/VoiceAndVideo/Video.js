import styled from "styled-components";

import useVideoCallback from "../../../hooks/useVideoCallback";

const Video = styled.video`
  height: 100%;
  width: 100%;
`;

const VideoContainer = styled.div`
  background-color: #000;
  height: 200px;
  width: 200px;
  position: relative;
`;

const Filler = styled.div`
  height: 200px;
  width: 200px;
  background-color: #000;
`;


export default function Component({ stream, className}) {
  const videoRef = useVideoCallback(stream);

  return (
    <VideoContainer>
      {stream ? (
        <Video autoPlay className={className} ref={videoRef} />
      ) : (
        <Filler />
      )}

    </VideoContainer>
  );
}
