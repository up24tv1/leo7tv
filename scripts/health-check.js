// Simple stream health check script
//
// This script reads the channel list from src/data/channels.ts (compiled by ts-node or via require) and
// performs a HEAD request on each stream URL to verify reachability.  Results are written
// into health.json.  Use node-fetch v3 for fetch in Node.

const fs = require('fs');
const { channels } = require('../src/data/channels');
const fetch = require('node-fetch');

async function checkStream(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeout);
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: err.type || err.code || 'error' };
  }
}

async function main() {
  const results = [];
  for (const channel of channels) {
    const { ok, status } = await checkStream(channel.streamUrl);
    results.push({ id: channel.id, ok, status, checkedAt: new Date().toISOString() });
  }
  fs.writeFileSync('health.json', JSON.stringify(results, null, 2));
  console.log('health.json updated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
