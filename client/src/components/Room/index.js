import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import CodeEditor from "./CodeEditor";
import VoiceAndVideo from "./VoiceAndVideo";
import Chat from "./Chat";
import useInput from "../../hooks/useInput";

export default function Index() {
  const { id: roomId } = useParams();
  const [socket, setSocket] = useState();
  const [hasJoined, setHasJoined] = useState(false);
  const name = useInput("");

  function renderJoinPrompt() {
    function onJoinSubmit(e) {
      e.preventDefault();
      if (!name.value.length) {
        return;
      }

      setHasJoined(true);
    }
    return (
      <form onSubmit={onJoinSubmit}>
        <label>Please enter your name</label>
        <input value={name.value} onChange={name.onChange} />
      </form>
    );
  }

  if (!hasJoined) return renderJoinPrompt();

  return (
    <div>
      <CodeEditor roomId={roomId} name={name.value}></CodeEditor>
      <VoiceAndVideo
        socket={socket}
        setSocket={setSocket}
        hasJoined={hasJoined}
        name={name.value}
        roomId={roomId}
      />
      <Chat socket={socket} name={name.value} roomId={roomId} />
    </div>
  );
}
