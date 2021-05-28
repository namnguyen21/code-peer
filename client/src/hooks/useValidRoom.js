import { useState, useEffect } from "react";
import axios from "axios";

const useValidRoom = (roomID) => {
  const [isValidRoom, setIsValidRoom] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://${
          process.env.API_ENDPOINT || "http://localhost:3001"
        }/room/join/${roomID}`
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
