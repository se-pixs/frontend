import { GetState, SetState } from 'zustand';
import { MyState } from './globalStore';

export interface ModalSlice {
  modalHeading: string;
  modalBody: string;
  modalButton: string;
  modalButtonOnClick: () => void;
  showModal: boolean;
  toggleModal: () => void;
  setShowModal: (val: boolean) => void;
  setModalHeading: (text: string) => void;
  setModalBody: (text: string) => void;
  setModalButton: (text: string) => void;
  setModalButtonOnClick: (handler: () => void) => void;
}

const createBearSlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  modalHeading: 'An error occurred',
  modalBody: 'An error occurred. Please try reloading the page.',
  modalButton: 'Reload',
  showModal: false,
  modalButtonOnClick: () => {
    //@ts-ignore
    window.location.reload(true);
  },
  toggleModal: () => {
    set((prev) => ({ showModal: !prev.showModal }));
  },
  setShowModal: (val: boolean) => {
    set(() => ({ showModal: val }));
  },
  setModalHeading: (text: string) => {
    set(() => ({ modalHeading: text }));
  },
  setModalBody: (text: string) => {
    set(() => ({ modalBody: text }));
  },
  setModalButton: (text: string) => {
    set(() => ({ modalButton: text }));
  },
  setModalButtonOnClick: (handler: () => void) => {
    set(() => ({ modalButtonOnClick: handler }));
  },
});

export default createBearSlice;
