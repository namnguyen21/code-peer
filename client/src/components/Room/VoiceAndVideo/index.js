import io from "socket.io-client";
import Peer from "peerjs";
import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { AiOutlineRotateLeft } from "react-icons/ai";

import Video from "./Video";
import MyVideo from "./MyVideo";
import Tooltip from "../../util/Tooltip";
import { createEmptyAudioTrack, createEmptyVideoTrack } from "./fakeStreams";

const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  z-index: 10;
  left: 50%;
  top: ${(props) => `${props.topBarHeight}px`};
`;

const Header = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.backgroundIsLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.1)"};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  cursor: move;
  position: relative;
  border-bottom: ${(props) => `solid 2px ${props.theme.colors.lightGrey}`};
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.orientation === "horizontal" ? "row" : "column"};
  justify-content: center;
  align-items: center;
  > *:not(:last-child) {
    border-right: ${(props) =>
      props.orientation === "horizontal"
        ? `solid 2px ${props.theme.colors.lightGrey}`
        : null};
    border-bottom: ${(props) =>
      props.orientation === "vertical"
        ? `solid 2px ${props.theme.colors.lightGrey}`
        : null};
  }
  > * {
    &:last-child {
      border-bottom-left-radius: ${(props) =>
        props.orientation === "vertical" ? "10px" : null};
      border-bottom-right-radius: 10px;
    }
    &:first-child {
      border-bottom-left-radius: ${(props) =>
        props.orientation === "horizontal" ? "10px" : null};
    }
  }
`;

const BarButtonContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

const BarButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.green.main};
  }
`;

export default function VoiceAndVideo({
  name,
  roomId,
  setSocket,
  backgroundIsLight,
  topBarHeight,
  hasJoined,
}) {
  const myPeer = useRef();
  const myPeerId = useRef();
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioIsEnabled, setAudioIsEnabled] = useState(false);
  const [videoIsEnabled, setVideoIsEnabled] = useState(false);
  const [myStream, setMyStream] = useState();
  const [peerStreams, setPeerStreams] = useState({});
  const [orientation, setOrientation] = useState("horizontal");

  useEffect(() => {
    if (!hasJoined) return;
    async function getMediaStreams() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let hasAudio = false;
      let hasVideo = false;
      const totalAudioDevices = [];
      const totalVideoDevices = [];
      devices.forEach((d) => {
        if (d.kind === "audioinput") {
          totalAudioDevices.push(d);
          hasAudio = true;
        }
        if (d.kind === "videoinput") {
          totalVideoDevices.push(d);
          hasVideo = true;
        }
      });
      setAudioDevices(totalAudioDevices);
      setVideoDevices(totalVideoDevices);
      try {
        let audioTrack, videoTrack;

        if (hasAudio && hasVideo) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          audioTrack = stream.getAudioTracks()[0];
          videoTrack = stream.getVideoTracks()[0];
        } else if (hasAudio && !hasVideo) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          audioTrack = stream.getAudioTracks()[0];
          videoTrack = createEmptyVideoTrack(100, 100);
        } else if (hasVideo && !hasAudio) {
          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoTrack = videoStream.getVideoTracks()[0];
          audioTrack = createEmptyAudioTrack();
        } else {
          // neither
          videoTrack = createEmptyVideoTrack();
          audioTrack = createEmptyAudioTrack();
        }
        const stream = new MediaStream([audioTrack, videoTrack]);
        setMyStream(stream);
        setAudioIsEnabled(hasAudio);
        setVideoIsEnabled(hasVideo);
        setAudioDevices(totalAudioDevices);
        setVideoDevices(totalVideoDevices);
      } catch (err) {
        // user denied access
        const fakeAudioTrack = createEmptyAudioTrack();
        const fakeVideoTrack = createEmptyVideoTrack();
        const stream = new MediaStream([fakeAudioTrack, fakeVideoTrack]);
        setMyStream(stream);
        setAudioIsEnabled(false);
        setVideoIsEnabled(false);
        setAudioDevices([]);
        setVideoDevices([]);
      }
    }
    getMediaStreams();
  }, [hasJoined]);

  useEffect(() => {
    if (!myStream || myPeer.current !== undefined) return;

    const socketConnection = io("http://localhost:3001");
    setSocket(socketConnection);
    myPeer.current = new Peer();
    myPeer.current.on("open", (myId) => {
      myPeerId.current = myId;
      socketConnection.emit("join-room", { userId: myId, roomId, name });
    });
    socketConnection.on("user-connected", ({ userId, name: userName }) => {
      callPeer(userId, userName, myStream);
      // callPeer(userId, userName, myVideoStream, "video");
    });
    myPeer.current.on("call", (incomingCall) => {
      const { callerId, name } = incomingCall.metadata;
      answerCall(incomingCall, callerId, name);
    });

    socketConnection.on("user-disconnected", (userId) => {
      const newStreams = { ...peerStreams };
      delete newStreams[userId];
      setPeerStreams(newStreams);
    });
  }, [myStream]);

  const callPeer = (peerId, peerName, myStream) => {
    const call = myPeer.current.call(peerId, myStream, {
      metadata: { callerId: myPeerId.current, name },
    });
    call.on("error", (err) => {
      console.log(err);
    });
    call.on("stream", (incomingStream) => {
      setPeerStreams((currentStreams) => {
        const newState = { ...currentStreams };
        newState[peerId] = {
          id: peerId,
          name: peerName,
          stream: incomingStream,
        };
        return newState;
      });
    });
  };

  function answerCall(call, callerId, callerName) {
    call.answer(myStream);
    call.on("stream", (incomingStream) => {
      setPeerStreams((currentStreams) => {
        const newState = { ...currentStreams };
        newState[callerId] = {
          id: callerId,
          name: callerName,
          stream: incomingStream,
        };
        return newState;
      });
    });
  }
  const renderPeerStreams = () => {
    const keys = Object.keys(peerStreams);
    if (keys.length === 0) return null;
    return keys.map((k, i) => (
      <Video stream={peerStreams[k].stream} name={peerStreams[k].name} />
    ));
  };

  function flipOrientation() {
    if (orientation === "horizontal") {
      setOrientation("vertical");
    } else {
      setOrientation("horizontal");
    }
  }

  const toggleAudio = () => {
    const audioTrack = myStream.getAudioTracks()[0];
    if (audioTrack.enabled === true) {
      audioTrack.enabled = false;
    } else {
      audioTrack.enabled = true;
    }

    setAudioIsEnabled((isEnabled) => !isEnabled);
  };

  const toggleVideo = () => {
    const videoTrack = myStream.getVideoTracks()[0];
    if (videoTrack.enabled === true) {
      videoTrack.enabled = false;
    } else {
      videoTrack.enabled = true;
    }

    setVideoIsEnabled((isEnabled) => !isEnabled);
  };
  return (
    <Draggable axis="both" scale={1} handle=".drag-handle" bounaries="parent">
      <Container topBarHeight={topBarHeight}>
        <Header className="drag-handle" backgroundIsLight={backgroundIsLight}>
          <BarButtonContainer>
            <Tooltip tip="Rotate Orientation">
              <BarButton onClick={flipOrientation}>
                <AiOutlineRotateLeft />
              </BarButton>
            </Tooltip>
          </BarButtonContainer>
          Peers
          <div></div>
        </Header>
        <VideoContainer orientation={orientation}>
          {myStream ? (
            <MyVideo
              name={name}
              toggleAudio={toggleAudio}
              audioIsEnabled={audioIsEnabled}
              videoIsEnabled={videoIsEnabled}
              audioDevices={audioDevices}
              videoDevices={videoDevices}
              toggleVideo={toggleVideo}
              stream={myStream}
            />
          ) : null}
          {renderPeerStreams()}
        </VideoContainer>
      </Container>
    </Draggable>
  );
}
