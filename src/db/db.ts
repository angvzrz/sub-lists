// db.ts
import Dexie, { type EntityTable } from 'dexie';
import type { Playlist } from '../types';

const db = new Dexie('FriendsDatabase') as Dexie & {
  playlists: EntityTable<
    Playlist,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  playlists: 'id, title, createdAt, updatedAt, category, subPlaylists, videos',
});

export { db };
