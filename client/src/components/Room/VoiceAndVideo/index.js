import io from "socket.io-client";
import Peer from "peerjs";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Audio from "./Audio";
import Video from "./Video";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 20%;
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
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function VoiceAndVideo({
  name,
  roomId,
  socket,
  setSocket,
  myAudioStream,
  myVideoStream,
  backgroundIsLight,
}) {
  const myPeer = useRef();
  const myPeerId = useRef();
  // const [myAudioStream, setMyAudioStream] = useState();
  // const [myVideoStream, setMyVideoStream] = useState();
  const [peerAudioStreams, setPeerAudioStreams] = useState({});
  const [peerVideoStreams, setPeerVideoStreams] = useState({});

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
    return keys.map((k, i) => (
      <Video key={i} stream={peerVideoStreams[k].stream} />
    ));
  };

  function onMouseDown(e) {
    console.log(e);
  }

  return (
    <Container>
      <Header onMouseDown={onMouseDown} backgroundIsLight={backgroundIsLight}>
        Peers
      </Header>
      <div>
        {myAudioStream ? <Audio stream={myAudioStream} /> : null}
        {renderPeerAudio()}
      </div>
      <VideoContainer>
        {myVideoStream ? <Video stream={myVideoStream} /> : null}
        {renderPeerVideo()}
      </VideoContainer>
    </Container>
  );
}

// useEffect(() => {
//   if (!hasJoined) return;
//   // async function getMediaStreams() {
//   //   const devices = await navigator.mediaDevices.enumerateDevices();
//   //   let hasAudio = false;
//   //   let hasVideo = false;

//   //   devices.forEach((d) => {
//   //     if (d.kind === "audioinput") hasAudio = true;
//   //     if (d.kind === "videoinput") hasVideo = true;
//   //   });
//   //   try {
//   //     if (hasVideo && hasAudio) {
//   //       const stream = await navigator.mediaDevices.getUserMedia({
//   //         video: true,
//   //         audio: true,
//   //       });
//   //       const audio = new MediaStream(stream.getAudioTracks());
//   //       const video = new MediaStream(stream.getVideoTracks());
//   //       setMyAudioStream(audio);
//   //       setMyVideoStream(video);
//   //     } else if (hasAudio && !hasVideo) {
//   //       const audioStream = await navigator.mediaDevices.getUserMedia({
//   //         audio: true,
//   //       });
//   //       setMyAudioStream(audioStream);
//   //       const fakeVideoStream = createFakeVideoStream();
//   //       setMyVideoStream(fakeVideoStream);
//   //     } else if (hasVideo && !hasAudio) {
//   //       const videoStream = await navigator.mediaDevices.getUserMedia({
//   //         video: true,
//   //       });
//   //       setMyVideoStream(videoStream);
//   //       const fakeAudioStream = createFakeAudioStream();
//   //       setMyAudioStream(fakeAudioStream);
//   //     } else {
//   //       const fakeAudioStream = createFakeAudioStream();
//   //       const fakeVideoStream = createFakeVideoStream();
//   //       setMyAudioStream(fakeAudioStream);
//   //       setMyVideoStream(fakeVideoStream);
//   //     }
//   //   } catch (err) {
//   //     if (err === "DOMException: Permission denied") {
//   //       // user denied access
//   //       const fakeAudioStream = createFakeAudioStream();
//   //       const fakeVideoStream = createFakeVideoStream();
//   //       setMyAudioStream(fakeAudioStream);
//   //       setMyVideoStream(fakeVideoStream);
//   //     }
//   //   }
//   // }
//  // getMediaStreams();
// }, [hasJoined]);
