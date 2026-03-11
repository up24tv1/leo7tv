import React from 'react';
import type { Channel } from '../data/channels';

interface Props {
  channel: Channel;
  onClick: () => void;
}

export default function ChannelCard({ channel, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
    >
      <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
      <p className="text-sm text-gray-400">{channel.languages.join(', ')}</p>
      <span className="text-xs mt-2 inline-block px-2 py-1 bg-cobalt rounded">
        {channel.qualityLabel}
      </span>
    </button>
  );
}
