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
  createPlaylistVideo: async function (
    video: Omit<PlaylistVideo, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const playlistId = video.playlistId;
    const playlist = await db.playlists.get(playlistId);
    if (!playlist) throw new Error('Playlist not found');

    const now = new Date().toISOString();
    const videoId = await db.videos.add({
      ...video,
      createdAt: now,
      updatedAt: now,
    });

    const updatedVideos = playlist.videos
      ? [...playlist.videos, videoId]
      : [videoId];

    return db.playlists.update(playlistId, {
      videos: updatedVideos,
      updatedAt: now,
    });
  },
};
