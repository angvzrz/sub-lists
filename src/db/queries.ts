import { db } from './db';
import type { Playlist, PlaylistVideo } from '@/types';

export const MUTATIONS = {
  createPlaylist: function (playlist: Playlist) {
    return db.playlists.add(playlist);
  },
  createPlaylistVideo: function (video: PlaylistVideo) {
    return db.videos.add(video);
  },
};
