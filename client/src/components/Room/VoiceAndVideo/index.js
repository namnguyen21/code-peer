import io from "socket.io-client";
import Peer from "peerjs";
import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { AiOutlineRotateLeft } from "react-icons/ai";

import Audio from "./Audio";
import Video from "./Video";
import Tooltip from "../../util/Tooltip";
import { createFakeAudioStream, createFakeVideoStream } from "./fakeStreams";

const Container = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  z-index: 10;
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
  myAudioStream,
  myVideoStream,
  backgroundIsLight,
  topBarHeight,
  hasJoined,
  setMyAudioStream,
  setMyVideoStream,
  setAudioIsEnabled,
  setVideoIsEnabled,
  setAudioDevices,
  setVideoDevices,
}) {
  const myPeer = useRef();
  const myPeerId = useRef();
  const [peerAudioStreams, setPeerAudioStreams] = useState({});
  const [peerVideoStreams, setPeerVideoStreams] = useState({});
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
        let audioStream, videoStream;

        if (hasAudio && hasVideo) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          audioStream = new MediaStream(stream.getAudioTracks());
          videoStream = new MediaStream(stream.getVideoTracks());
        } else if (hasAudio && !hasVideo) {
          audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          videoStream = createFakeVideoStream();
        } else if (hasVideo && !hasAudio) {
          videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          audioStream = createFakeAudioStream();
        } else {
          // neither
          videoStream = createFakeVideoStream();
          audioStream = createFakeAudioStream();
        }
        setMyAudioStream(audioStream);
        setMyVideoStream(videoStream);
        setAudioIsEnabled(hasAudio);
        setVideoIsEnabled(hasVideo);
        setAudioDevices(totalAudioDevices);
        setVideoDevices(totalVideoDevices);
      } catch (err) {
        // user denied access
        const fakeAudioStream = createFakeAudioStream();
        const fakeVideoStream = createFakeVideoStream();
        setMyAudioStream(fakeAudioStream);
        setMyVideoStream(fakeVideoStream);
        setAudioIsEnabled(false);
        setVideoIsEnabled(false);
        setAudioDevices([]);
        setVideoDevices([]);
      }
    }
    getMediaStreams();
  }, [hasJoined]);

  useEffect(() => {
    if (!myVideoStream || !myAudioStream || myPeer.current !== undefined)
      return;

    const socketConnection = io("http://localhost:3001");
    setSocket(socketConnection);
    myPeer.current = new Peer();
    myPeer.current.on("open", (myId) => {
      myPeerId.current = myId;
      socketConnection.emit("join-room", { userId: myId, roomId, name });
    });
    socketConnection.on("user-connected", ({ userId, name: userName }) => {
      callPeer(userId, userName, myAudioStream, "audio");
      callPeer(userId, userName, myVideoStream, "video");
    });
    myPeer.current.on("call", (incomingCall) => {
      const { type, callerId, name } = incomingCall.metadata;
      answerCall(incomingCall, callerId, name, type);
    });

    socketConnection.on("user-disconnected", (userId) => {
      const newAudio = { ...peerAudioStreams };
      const newVideo = { ...peerVideoStreams };
      delete newAudio[userId];
      delete newVideo[userId];
      setPeerAudioStreams(newAudio);
      setPeerVideoStreams(newVideo);
    });
  }, [myAudioStream, myVideoStream]);

  function callPeer(peerId, peerName, myStream, type) {
    if (type === "audio") {
      const audioCall = myPeer.current.call(peerId, myStream, {
        metadata: {
          callerId: myPeerId.current,
          type: "audio",
          name,
        },
      });
      audioCall.on("error", (err) => {
        console.log(err);
      });
      audioCall.on("stream", (otherStream) => {
        setPeerAudioStreams((streams) => {
          const newState = { ...streams };
          newState[peerId] = {
            id: peerId,
            name: peerName,
            stream: otherStream,
          };
          return newState;
        });
      });
    }
    if (type === "video") {
      const videoCall = myPeer.current.call(peerId, myStream, {
        metadata: {
          callerId: myPeerId.current,
          type: "video",
          name,
        },
      });
      videoCall.on("error", (err) => {
        console.log(err);
      });
      videoCall.on("stream", (otherStream) => {
        setPeerVideoStreams((streams) => {
          const newState = { ...streams };
          newState[peerId] = {
            id: peerId,
            name: peerName,
            stream: otherStream,
          };
          return newState;
        });
      });
    }
  }

  function answerCall(call, callerId, callerName, type) {
    if (type === "audio") {
      call.answer(myAudioStream);
      call.on("stream", (incomingStream) => {
        setPeerAudioStreams((streams) => {
          const newState = { ...streams };
          newState[callerId] = {
            id: callerId,
            name: callerName,
            stream: incomingStream,
          };
          return newState;
        });
      });
    }
    if (type === "video") {
      call.answer(myVideoStream);
      call.on("stream", (incomingStream) => {
        setPeerVideoStreams((streams) => {
          const newState = { ...streams };
          newState[callerId] = {
            id: callerId,
            name: callerName,
            stream: incomingStream,
          };
          return newState;
        });
      });
    }
  }
  function renderPeerAudio() {
    const peerAudioKeys = Object.keys(peerAudioStreams);
    if (peerAudioKeys.length === 0) return null;
    return peerAudioKeys.map((id, i) => (
      <Audio key={i} stream={peerAudioStreams[id].stream} />
    ));
  }

  const renderPeerVideo = () => {
    const keys = Object.keys(peerVideoStreams);
    if (keys.length === 0) {
      return null;
    }
    return keys.map((k, i) => {
      console.log(peerVideoStreams[k]);
      return (
        <Video
          key={i}
          name={peerVideoStreams[k].name}
          stream={peerVideoStreams[k].stream}
        />
      );
    });
  };

  function flipOrientation() {
    if (orientation === "horizontal") {
      setOrientation("vertical");
    } else {
      setOrientation("horizontal");
    }
  }
  console.log(topBarHeight);
  return (
    <Draggable
      axis="both"
      defaultPosition={{ x: 200, y: Math.ceil(topBarHeight) }}
      scale={1}
      handle=".drag-handle"
      bounaries="parent"
    >
      <Container>
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
        <div>
          {myAudioStream ? <Audio name={name} stream={myAudioStream} /> : null}
          {renderPeerAudio()}
        </div>
        <VideoContainer orientation={orientation}>
          {myVideoStream ? <Video name={name} stream={myVideoStream} /> : null}
          {renderPeerVideo()}
        </VideoContainer>
      </Container>
    </Draggable>
  );
}
