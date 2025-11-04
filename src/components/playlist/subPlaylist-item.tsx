import type { Playlist } from '@/types';
import Link from 'next/link';

type SubPlaylistItemProps = Readonly<{
  playlist: Playlist;
}>;

export function SubPlaylistItem({
  playlist: { id, title, createdAt, updatedAt },
}: SubPlaylistItemProps) {
  return (
    <li className="flex flex-col rounded-md border p-4">
      <Link href={`/playlist/${id}`} className="block hover:underline">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">Created At: {createdAt}</p>
        <p className="text-sm text-gray-500">Updated At: {updatedAt}</p>
      </Link>
    </li>
  );
}
