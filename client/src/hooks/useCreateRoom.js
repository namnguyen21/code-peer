import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const useCreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomID, setRoomID] = useState("");
  const onCreateRoom = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/room/create"
        : `${process.env.REACT_APP_API_URL}/room/create`
    );
    console.log(data.roomID);
    setRoomID(data.roomID);
    setIsLoading(false);
  };
  return {
    isLoading,
    onCreateRoom,
    roomID,
  };
};

export default useCreateRoom;
