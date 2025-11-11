import { NewPlaylistDialog } from '@/components/playlist/new-playlist-dialog';
import { PlaylistsList } from '@/components/playlist/playlists-list';

export default function Home() {
  return (
    <div className="grid min-h-screen p-8 pb-20 font-sans sm:p-20">
      <main>
        <div className="mb-8">
          <h1>Playlists</h1>
          <p>Create playlists with subcategory lists</p>
        </div>

        <section>
          <PlaylistsList />
        </section>

        <div className="fixed bottom-0 left-0 flex w-full items-center justify-center bg-slate-900">
          <NewPlaylistDialog />
        </div>
      </main>
    </div>
  );
}
