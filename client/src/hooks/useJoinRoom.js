import { useState, useEffect } from "react";
import axios from "axios";

const useJoinRoom = (roomID) => {
  const [isValidRoom, setIsValidRoom] = useState(null);
  const [config, setConfig] = useState({
    color: undefined,
    theme: undefined,
    language: undefined,
  });

  useEffect(() => {
    axios
      .get(
        process.env.NODE_ENV === "development"
          ? `http://localhost:8080/room/join/${roomID}`
          : `${process.env.REACT_APP_API_URL}/room/join/${roomID}`
      )
      .then(({ data }) => {
        if (data.error) {
          setIsValidRoom(false);
        } else {
          setIsValidRoom(true);
          setConfig({
            theme: data.theme,
            language: data.language,
            color: data.color,
          });
        }
      });
  }, []);
  return { isValidRoom, ...config };
};

export default useJoinRoom;
