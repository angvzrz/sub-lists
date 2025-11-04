import { PLAYLISTS_MOCK } from '@/constants';
import { PlaylistView } from '../../../components/playlist/playlist-view';
import { BackButton } from '@/components/playlist/back-button';

export default async function ListPage({
  params,
}: PageProps<'/playlist/[id]'>) {
  const routeParams = await params;
  const playlistId = routeParams.id;
  const playlist = PLAYLISTS_MOCK.find((pl) => pl.id === playlistId);

  if (!playlist) return <div>Playlist not found</div>;

  return (
    <main className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-3xl">{playlist.title}</h1>
      <PlaylistView playList={playlist} />
    </main>
  );
}
