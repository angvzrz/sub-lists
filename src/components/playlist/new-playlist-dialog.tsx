'use client';

import { useRef } from 'react';
import { Button } from '../ui/button';
import { MUTATIONS } from '@/db/queries';
import { DialogWrapper } from './dialog-wrapper';

export function NewPlaylistDialog() {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleCreatePlaylist = () => {
    if (!titleInputRef.current) return;

    MUTATIONS.createPlaylist({
      title: titleInputRef.current.value,
      category: 'Uncategorized',
    });
  };

  return (
    <DialogWrapper
      inputRef={titleInputRef}
      dialogTitle="New playlist"
      dialogDescription="Enter the playlist details below."
      dialogAction={handleCreatePlaylist}
    >
      <Button className="bg-transparent hover:cursor-pointer">
        Create new playlist
      </Button>
    </DialogWrapper>
  );
}
