"use client";
import { create } from "zustand";
import { PersistStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface EarningsState {
    potentialClaimEarnings: number;
}
interface EarningsActions {
    addPotentialClaimEarnings: (amount: number) => void;
    decreasePotentialClaimEarnings: (amount: number) => void;
}

const localStorageSpace: PersistStorage<EarningsState & EarningsActions> = {
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

const initialState: EarningsState = {
    potentialClaimEarnings: 0,
};

const useEarningsStore = create(
    persist<EarningsState & EarningsActions>(
        (set) => ({
            ...initialState,
            addPotentialClaimEarnings: (amount: number) =>
                set((state) => ({ potentialClaimEarnings: state.potentialClaimEarnings + amount })),
            decreasePotentialClaimEarnings: (amount: number) =>
                set((state) => ({ potentialClaimEarnings: state.potentialClaimEarnings - amount })),
        }),
        {
            name: "earnings-storage",
            storage: localStorageSpace,
        }
    )
);

export default useEarningsStore;
