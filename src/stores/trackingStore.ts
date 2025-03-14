"use client";
import { create } from "zustand";
import { PersistStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface TrackingState {
    moreClicks: number;
    itemClicks: number;
}

interface TrackingActions {
    addMoreClicks: () => void;
    addItemClicks: () => void;
}

const localStorageSpace: PersistStorage<TrackingState & TrackingActions> = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return JSON.parse(str);
    },
    setItem: (name, value) => {
        localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name) => localStorage.removeItem(name),
};

const initialState: TrackingState = {
    moreClicks: 0,
    itemClicks: 0,
};

const useTrackingStore = create(
    persist<TrackingState & TrackingActions>(
        (set) => ({
            ...initialState,
            addMoreClicks: () => set((state) => ({ moreClicks: state.moreClicks + 1 })),
            addItemClicks: () => set((state) => ({ itemClicks: state.itemClicks + 1 })),
        }),
        {
            name: "tracking-storage",
            storage: localStorageSpace,
        }
    )
);

export default useTrackingStore;
