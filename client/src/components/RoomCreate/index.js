import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Modal from "../util/Modal";

export default function RoomCreate() {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const createRoomId = async () => {
      console.log(process.env.REACT_APP_API_URL);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/room/create"
      );
      setRoomId(data.roomID);
    };
    createRoomId();
  }, []);

  if (roomId.length === 0) {
    return (
      <div>
        <Modal isOpen={roomId.length > 0 ? false : true} />
      </div>
    );
  } else {
    return <Redirect to={`/room/${roomId}`} />;
  }
}
