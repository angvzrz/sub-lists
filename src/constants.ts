import type { Playlist } from './types';

export const PLAYLISTS_MOCK: Playlist[] = [
  {
    id: '1',
    title: 'My Playlist 1',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-05',
    category: 'Music',
    subPlaylists: [
      {
        id: '1-1',
        title: 'Rock',
        createdAt: '2023-10-01',
        updatedAt: '2023-10-03',
        category: 'Music',
      },
      {
        id: '1-2',
        title: 'Pop',
        createdAt: '2023-10-02',
        updatedAt: '2023-10-04',
        category: 'Music',
      },
    ],
    videos: [
      {
        id: 'v1-1',
        title: 'Video 1',
        playlistId: '',
        channel: 'Channel A',
        createdAt: '2023-10-01',
        updatedAt: '2023-10-02',
      },
      {
        id: 'v2',
        title: 'Video 2',
        playlistId: '',
        channel: 'Channel B',
        createdAt: '2023-10-03',
        updatedAt: '2023-10-04',
      },
    ],
  },
  {
    id: '2',
    title: 'My Playlist 2',
    createdAt: '2023-10-02',
    updatedAt: '2023-10-06',
    category: 'Podcasts',
    videos: [
      {
        id: 'v1-2',
        title: 'Video 1',
        playlistId: '',
        channel: 'Channel C',
        createdAt: '2023-10-01',
        updatedAt: '2023-10-02',
      },
      {
        id: 'v2',
        title: 'Video 2',
        playlistId: '',
        channel: 'Channel D',
        createdAt: '2023-10-03',
        updatedAt: '2023-10-04',
      },
    ],
  },
  {
    id: '3',
    title: 'My Playlist 3',
    createdAt: '2023-10-03',
    updatedAt: '2023-10-07',
    category: 'Audiobooks',
    videos: [
      {
        id: 'v1-3',
        title: 'Video 1',
        playlistId: '',
        channel: 'Channel E',
        createdAt: '2023-10-01',
        updatedAt: '2023-10-02',
      },
      {
        id: 'v2',
        title: 'Video 2',
        playlistId: '',
        channel: 'Channel F',
        createdAt: '2023-10-03',
        updatedAt: '2023-10-04',
      },
    ],
  },
];
