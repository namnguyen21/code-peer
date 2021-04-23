import { useEffect, useRef } from "react";

export default function Audio({ stream }) {
  const audioRef = useRef();

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.srcObject = stream;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then().catch((err) => console.log(err));
    }
  }, [audioRef.current]);

  return <audio ref={audioRef} autoPlay />;
}
