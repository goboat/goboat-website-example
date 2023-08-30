import React from 'react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const sources = {
    m3u8: `${props.src}/ik-master.m3u8?tr=sr-360_480_720`,
    thumbnail: `${props.src}/ik-thumbnail.jpg`,
    mp4: `${props.src}?f=mp4`,
    webm: `${props.src}?f=webm`,
  };

  return (
    <video className={props.className} autoPlay muted loop poster={sources.thumbnail}>
      <source src={sources.m3u8} type="application/x-mpegURL" />
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
