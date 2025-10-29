'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="link"
      onClick={() => router.back()}
      className="cursor-pointer p-0"
    >
      ←
    </Button>
  );
}
