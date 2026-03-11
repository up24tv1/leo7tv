export interface Channel {
  id: string;
  name: string;
  country: string;
  region: string;
  category: string;
  languages: string[];
  type: 'tv' | 'radio';
  officialSite?: string;
  streamUrl: string;
  streamFormat: string;
  captionsAvailable: boolean;
  qualityLabel: string;
  verifiedOfficialSource: boolean;
  healthScore: number;
  checkedAt: string;
  notes?: string;
}

export const channels: Channel[] = [
  {
    id: 'dw-en',
    name: 'DW News (English)',
    country: 'Germany',
    region: 'International',
    category: 'News',
    languages: ['English'],
    type: 'tv',
    officialSite: 'https://www.dw.com',
    streamUrl: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
    streamFormat: 'HLS',
    captionsAvailable: false,
    qualityLabel: '720p',
    verifiedOfficialSource: true,
    healthScore: 1,
    checkedAt: '2026-03-11T00:00:00Z',
    notes: 'Sample official stream for demonstration.',
  },
  {
    id: 'nhk-world',
    name: 'NHK World-Japan',
    country: 'Japan',
    region: 'International',
    category: 'News',
    languages: ['English'],
    type: 'tv',
    officialSite: 'https://www3.nhk.or.jp/nhkworld/',
    streamUrl: 'https://master.nhkworld.jp/nhkworld-tv/playlist/live.m3u8',
    streamFormat: 'HLS',
    captionsAvailable: true,
    qualityLabel: '720p',
    verifiedOfficialSource: true,
    healthScore: 1,
    checkedAt: '2026-03-11T00:00:00Z',
    notes: 'Sample official stream for demonstration.',
  },
];
