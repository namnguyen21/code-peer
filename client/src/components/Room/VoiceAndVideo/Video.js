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

const NameTag = styled.p`
  position: absolute;
  background-color: ${(props) => props.color};
  position: absolute;
  color: white;
  display: inline;
  padding: 2px 10px;
  z-index: 2;
  bottom: 5px;
  left: 5px;
  font-size: 0.8rem;
`;

export default function Component({ stream, className, name, color }) {
  const videoRef = useVideoCallback(stream);

  return (
    <VideoContainer>
      {stream ? (
        <Video autoPlay color={color} className={className} ref={videoRef} />
      ) : (
        <Filler />
      )}

      <NameTag>{name}</NameTag>
    </VideoContainer>
  );
}
