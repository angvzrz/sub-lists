import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type DialogWrapperProps = {
  titleInputRef: React.RefObject<HTMLInputElement | null>;
  urlInputRef?: React.RefObject<HTMLInputElement | null>;
  dialogTitle: string;
  dialogDescription: string;
  dialogAction: () => void;
};

export function DialogWrapper({
  children,
  titleInputRef,
  urlInputRef,
  dialogTitle,
  dialogDescription,
  dialogAction,
}: React.PropsWithChildren<DialogWrapperProps>) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="flex w-80 flex-col gap-8">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription className="flex flex-col gap-6">
              {dialogDescription}
              <div className="flex flex-col gap-2">
                <Input ref={titleInputRef} placeholder="Choose a title" />
              </div>
              {urlInputRef && (
                <div className="flex flex-col gap-2">
                  <Input ref={urlInputRef} placeholder="Add url" />
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex w-full flex-1">
            <DialogClose asChild className="flex-1 cursor-pointer">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={dialogAction}
              className="flex-1 cursor-pointer"
            >
              {urlInputRef ? 'Add video' : 'Create playlist'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
