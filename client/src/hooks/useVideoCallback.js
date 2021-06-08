import { useCallback } from "react";

const useVideoCallback = (stream) => {
  const videoRef = useCallback(
    (node) => {
      if (!node || !stream) return;
      node.srcObject = stream;
    },
    [stream]
  );
  return videoRef;
};

export default useVideoCallback;
