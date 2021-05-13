import styled from "styled-components";

import useVideoCallback from '../../../hooks/useVideoCallback'

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

const NameTag = styled.p`
  position: absolute;
  background-color: rgba(114, 137, 218, 0.7);
  position: absolute;
  color: white;
  display: inline;
  padding: 2px 10px;
  z-index: 2;
  bottom: 5px;
  left: 5px;
  font-size: 0.8rem;
`;

export default function Component({ stream, className, name }) {

  const videoRef = useVideoCallback(stream)

  return (
    <VideoContainer>
      <Video autoPlay className={className} ref={videoRef} />
      <NameTag>{name}</NameTag>
    </VideoContainer>
  );
}
