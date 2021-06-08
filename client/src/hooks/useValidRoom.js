import { useState, useEffect } from "react";
import axios from "axios";

const useValidRoom = (roomID) => {
  const [isValidRoom, setIsValidRoom] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    axios
      .get(
        process.env.NODE_ENV === "development"
          ? "http://localhost:8080/room/join"
          : `${process.env.REACT_APP_API_URL}/room/join`
      )
      .then((response) => {
        if (response.data.error) {
          setIsValidRoom(false);
        } else {
          setIsValidRoom(true);
          setColor(response.data.color);
        }
      });
  }, []);

  return { isValidRoom, color };
};

export default useValidRoom;
