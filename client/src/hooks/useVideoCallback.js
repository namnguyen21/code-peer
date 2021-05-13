import { useCallback } from "react";

const useVideoCallback = (stream) => {
  const videoRef = useCallback((node) => {
    if (!node) return;
    node.srcObject = stream;
  }, []);
  return videoRef;
};

export default useVideoCallback;
