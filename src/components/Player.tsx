import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { channels } from '../data/channels';

interface Props {
  channel: string;
  onClose: () => void;
}

export default function Player({ channel, onClose }: Props) {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const data = channels.find((c) => c.id === channel);

  useEffect(() => {
    if (!data || !videoNode.current) return;
    const player = videojs(videoNode.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      sources: [
        {
          src: data.streamUrl,
          type: 'application/x-mpegURL',
        },
      ],
    });
    return () => {
      player.dispose();
    };
  }, [data]);

  if (!data) return null;
  return (
    <div className="w-full max-w-3xl">
      <button onClick={onClose} className="text-white mb-2">Close</button>
      <video
        ref={videoNode}
        className="video-js vjs-big-play-centered"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
