import { GetState, SetState } from 'zustand';
import { MyState } from './globalStore';

export interface DeleteAndRetrySlice {
  deleteAndRetryActive: boolean;
  setDeleteAndRetryActive: (val: boolean) => void;
  toggleDeleteAndRetryActive: () => void;
}

const createDeleteAndRetrySlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  deleteAndRetryActive: false,
  toggleDeleteAndRetryActive: () => {
    set((prev) => ({ deleteAndRetryActive: !prev.deleteAndRetryActive }));
  },
  setDeleteAndRetryActive: (val: boolean) => {
    set(() => ({ deleteAndRetryActive: val }));
  },
});

export default createDeleteAndRetrySlice;
