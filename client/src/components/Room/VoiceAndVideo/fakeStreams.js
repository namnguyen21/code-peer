const createEmptyAudioTrack = () => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  const track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, { enabled: false });
};

const createEmptyVideoTrack = (width, height) => {
  const canvas = Object.assign(document.createElement("canvas"), {
    width,
    height,
  });
  canvas.getContext("2d").fillRect(0, 0, width, height);
  const stream = canvas.captureStream();
  const track = stream.getVideoTracks();
  return Object.assign(track, { enabled: false });
};

export const createFakeVideoStream = () => {
  const videoTrack = createEmptyVideoTrack(100, 100);
  return new MediaStream(videoTrack);
};

export const createFakeAudioStream = () => {
  const audioTrack = createEmptyAudioTrack();
  return new MediaStream([audioTrack]);
};
