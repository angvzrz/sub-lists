'use client';

import { PlaylistVideoItem } from './playlist-video-item';
import { SubPlaylistItem } from './subPlaylist-item';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';

type PlaylistProps = Readonly<{
  playlistId: string;
}>;

export function PlaylistView({ playlistId }: PlaylistProps) {
  const playlists = useLiveQuery(() => db.playlists.toArray());
  const playlist = playlists?.find((pl) => pl.id === playlistId);

  if (!playlist) return <div>No content found.</div>;

  return (
    <>
      <section>
        <h1 className="text-3xl">{playlist.title}</h1>
        <h2 className="px-8 pt-8 text-xl font-bold">Sub-Playlists</h2>

        <ul className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-3">
          {!playlist.subPlaylists || playlist.subPlaylists.length === 0 ? (
            <div className="p-4">
              <p className="text-gray-500">No sub-playlists yet</p>
            </div>
          ) : (
            playlist.subPlaylists?.map((subPlaylist) => (
              <SubPlaylistItem key={subPlaylist.id} playlist={subPlaylist} />
            ))
          )}
        </ul>
      </section>
      <section>
        <ul className="grid grid-cols-1 gap-4 p-8">
          <h2 className="px-8 pt-8 text-xl font-bold">Videos</h2>
          {!playlist.videos || playlist.videos.length === 0 ? (
            <div className="p-4">
              <p className="text-gray-500">No videos in this playlist yet</p>
            </div>
          ) : (
            playlist.videos.map((video) => (
              <PlaylistVideoItem key={video.id} video={video} />
            ))
          )}
        </ul>
      </section>
    </>
  );
}
