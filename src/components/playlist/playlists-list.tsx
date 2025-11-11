'use client';

import { db } from '@/db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';

export function PlaylistsList() {
  const playlists = useLiveQuery(() => db.playlists.toArray());

  if (!playlists || playlists.length === 0) return <p>No playlists found.</p>;

  return (
    <ul className="grid grid-cols-1 gap-4">
      {playlists.map((playlist) => (
        <li key={playlist.id} className="flex flex-col rounded-md border p-4">
          <Link href={`/playlist/${playlist.id}`}>
            <h2 className="text-lg font-semibold">{playlist.title}</h2>
            <p className="text-sm text-gray-500">
              Category: {playlist.category}
            </p>
            <p className="text-sm text-gray-500">
              Created At: {playlist.createdAt}
            </p>
            <p className="text-sm text-gray-500">
              Updated At: {playlist.updatedAt}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
