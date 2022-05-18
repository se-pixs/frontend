import create from 'zustand';
import createModalSlice, { ModalSlice } from './createModalSlice';
import createDeleteAndRetrySlice, { DeleteAndRetrySlice } from './deleteAndRetrySlice';

interface GlobalStore {
  uploadedImage: Blob | null;
  setUploadedImage: (file: Blob) => void;
  clearUploadedImage: () => void;
}

export type MyState = ModalSlice & GlobalStore & DeleteAndRetrySlice; // combine with other slices through "&"

const useStore = create<MyState>((set, get) => ({
  uploadedImage: null,
  setUploadedImage: (img: Blob) => {
    set(() => ({ uploadedImage: img }));
  },
  clearUploadedImage: () => {
    set(() => ({ uploadedImage: null }));
  },
  ...createModalSlice(set, get),
  ...createDeleteAndRetrySlice(set, get),
}));

export default useStore;
