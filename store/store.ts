import { create } from 'zustand'

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string) => void;

  filename: string ;
  setFilename: (filename: string ) => void;
}


export const useAppStore = create<AppState>() ((set) => ({
  fileId: null,
  setFileId: (fileId) => set(() => ({ fileId })),

  filename: '',
  setFilename: (filename) => set(() => ({ filename })),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (isDeleteModalOpen) => set(() => ({ isDeleteModalOpen })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (isRenameModalOpen) => set(() => ({ isRenameModalOpen })),
}));


