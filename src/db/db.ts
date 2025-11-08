// db.ts
import Dexie, { type EntityTable } from 'dexie';
import type { Playlist, PlaylistVideo } from '../types';

const db = new Dexie('FriendsDatabase') as Dexie & {
  playlists: EntityTable<
    Playlist,
    'id' // primary key "id" (for the typings only)
  >;
  videos: EntityTable<PlaylistVideo, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  playlists: 'id, title, createdAt, updatedAt, category, subPlaylists, videos',
  videos: 'id, title, playlistId, channel, createdAt, updatedAt',
});

export { db };
