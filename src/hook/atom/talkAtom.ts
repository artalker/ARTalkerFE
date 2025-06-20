import { atom } from 'jotai';

export const isPlayingAtom = atom<boolean>(false);
export const isResultModalOpenAtom = atom<boolean>(false);

export const isCompletedAtom = atom<boolean>(false);
export const isEndAtom = atom<boolean>(false);
export const isStartAtom = atom<boolean>(false);

export const timeAtom = atom<number>(300);

export const conversationIdAtom = atom<any>();
