"use client";
import { create } from "zustand";
import { PersistStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface CaseStoreState {
    checkedItems: Record<string, boolean>;
}

interface CaseStoreActions {
    toggleChecked: (id: string) => void;
    resetChecked: () => void;
}

const localStorageSpace: PersistStorage<CaseStoreState & CaseStoreActions> = {
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

const initialState: CaseStoreState = {
    checkedItems: {},
};

const useCaseStore = create(
    persist<CaseStoreState & CaseStoreActions>(
        (set, get) => ({
            ...initialState,
            toggleChecked: (id) => {
                const currentChecked = get().checkedItems;
                const newChecked = { ...currentChecked, [id]: !currentChecked[id] };
                set({ checkedItems: newChecked });
            },
            resetChecked: () => set({ checkedItems: {} }),
        }),
        {
            name: "case-store",
            storage: localStorageSpace,
        }
    )
);

export default useCaseStore;
