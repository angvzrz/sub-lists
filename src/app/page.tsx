import { Button } from '@/components/ui/button';

const playlists = [
  {
    id: '1',
    name: 'My Playlist 1',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-05',
    category: 'Music',
  },
  {
    id: '2',
    name: 'My Playlist 2',
    createdAt: '2023-10-02',
    updatedAt: '2023-10-06',
    category: 'Podcasts',
  },
  {
    id: '3',
    name: 'My Playlist 3',
    createdAt: '2023-10-03',
    updatedAt: '2023-10-07',
    category: 'Audiobooks',
  },
];

export default function Home() {
  return (
    <div className="grid min-h-screen p-8 pb-20 font-sans sm:p-20">
      <main>
        <div className="mb-8">
          <h1>Playlists</h1>
          <p>Create playlists with subcategory lists</p>
        </div>

        <section>
          <ul className="grid grid-cols-1 gap-4">
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className="flex flex-col rounded-md border p-4"
              >
                <h2 className="text-lg font-semibold">{playlist.name}</h2>
                <p className="text-sm text-gray-500">
                  Category: {playlist.category}
                </p>
                <p className="text-sm text-gray-500">
                  Created At: {playlist.createdAt}
                </p>
                <p className="text-sm text-gray-500">
                  Updated At: {playlist.updatedAt}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="fixed bottom-0 left-0 flex w-full items-center justify-center bg-slate-900">
          <Button className="bg-transparent hover:cursor-pointer">
            Create new playlist
          </Button>
        </div>
      </main>
    </div>
  );
}
