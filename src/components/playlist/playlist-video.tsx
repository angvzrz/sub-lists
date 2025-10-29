import type { PlaylistVideo } from '@/types';

type PlaylistVideoProps = Readonly<{
  video: PlaylistVideo;
}>;

export function PlaylistVideo({
  video: { id, title, playlistId: playlist, channel },
}: PlaylistVideoProps) {
  return (
    <li key={id} className="flex flex-col rounded-md border p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{channel}</p>
      <p className="text-sm text-gray-500">{playlist}</p>
    </li>
  );
}
