import { useState } from 'react';
import { channels } from '../data/channels';
import ChannelCard from '../components/ChannelCard';
import Player from '../components/Player';

export default function Home() {
  const [current, setCurrent] = useState<string | null>(null);
  const selected = channels.find((c) => c.id === current);
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Featured Channels</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} onClick={() => setCurrent(channel.id)} />
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <Player channel={selected.id} onClose={() => setCurrent(null)} />
        </div>
      )}
    </div>
  );
}
