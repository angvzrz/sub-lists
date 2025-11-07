import { db } from './db';
import type { Playlist } from '@/types';

export const MUTATIONS = {
  createPlaylist: function (playlist: Playlist) {
    return db.playlists.add(playlist);
  },
};
