import { PlaylistVideoItem } from './playlist-video-item';
import type { Playlist } from '@/types';
import { SubPlaylistItem } from './subPlaylist-item';

type PlaylistProps = Readonly<{
  playList: Playlist;
}>;

export function PlaylistView({ playList }: PlaylistProps) {
  return (
    <>
      <section>
        <h2 className="px-8 pt-8 text-xl font-bold">Sub-Playlists</h2>
        <ul className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 lg:grid-cols-3">
          {playList.subPlaylists?.map((subPlaylist) => (
            <li
              key={subPlaylist.id}
              className="flex flex-col rounded-md border p-4"
            >
              <SubPlaylistItem playlist={subPlaylist} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <ul className="grid grid-cols-1 gap-4 p-8">
          <h2 className="px-8 pt-8 text-xl font-bold">Videos</h2>
          {!playList.videos || playList.videos.length === 0 ? (
            <div className="p-4">
              <p className="text-gray-500">No videos in this playlist yet</p>
            </div>
          ) : (
            playList.videos.map((video) => (
              <PlaylistVideoItem key={video.id} video={video} />
            ))
          )}
        </ul>
      </section>
    </>
  );
}
