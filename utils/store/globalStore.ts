import create from 'zustand';
import createModalSlice, { ModalSlice } from './createModalSlice';

interface GlobalStore {
  uploadedImage: Blob | null;
  setUploadedImage: (file: Blob) => void;
  clearUploadedImage: () => void;
}

export type MyState = ModalSlice & GlobalStore; // combine with other slices through "&"

const useStore = create<MyState>((set, get) => ({
  uploadedImage: null,
  setUploadedImage: (img: Blob) => {
    set(() => ({ uploadedImage: img }));
  },
  clearUploadedImage: () => {
    set(() => ({ uploadedImage: null }));
  },
  ...createModalSlice(set, get),
}));

export default useStore;
