import { db } from './db';
import type { Playlist, PlaylistVideo } from '@/types';

export const MUTATIONS = {
  createPlaylist: function (
    playlist: Omit<
      Playlist,
      'id' | 'subPlaylists' | 'videos' | 'createdAt' | 'updatedAt'
    >,
  ) {
    const now = new Date().toISOString();

    return db.playlists.add({
      category: playlist.category,
      title: playlist.title,
      createdAt: now,
      updatedAt: now,
    });
  },
  createPlaylistVideo: function (video: PlaylistVideo) {
    return db.videos.add(video);
  },
};
