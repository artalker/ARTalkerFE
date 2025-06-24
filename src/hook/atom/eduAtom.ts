import { atom } from 'jotai';

export const dateAtom = atom<any>();
export const periodAtom = atom<'week' | 'month'>('week');
