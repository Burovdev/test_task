import useEarningsStore from "@/stores/earningsStore";
import { act } from "@testing-library/react";

describe("useEarningsStore", () => {
    beforeEach(() => {
        localStorage.clear();
        useEarningsStore.setState({ potentialClaimEarnings: 0 });
    });

    it("should have initial potentialClaimEarnings = 0", () => {
        const { potentialClaimEarnings } = useEarningsStore.getState();
        expect(potentialClaimEarnings).toBe(0);
    });

    it("should add potentialClaimEarnings", () => {
        act(() => {
            useEarningsStore.getState().addPotentialClaimEarnings(50);
        });
        const { potentialClaimEarnings } = useEarningsStore.getState();
        expect(potentialClaimEarnings).toBe(50);
    });

    it("should decrease potentialClaimEarnings", () => {
        act(() => {
            useEarningsStore.getState().addPotentialClaimEarnings(100);
            useEarningsStore.getState().decreasePotentialClaimEarnings(30);
        });
        const { potentialClaimEarnings } = useEarningsStore.getState();
        expect(potentialClaimEarnings).toBe(70);
    });

    it("should persist to localStorage", () => {
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

        act(() => {
            useEarningsStore.getState().addPotentialClaimEarnings(20);
        });

        expect(setItemSpy).toHaveBeenCalledWith("earnings-storage", expect.any(String));

        const stored = localStorage.getItem("earnings-storage");
        expect(stored).not.toBeNull();
        if (stored) {
            const parsed = JSON.parse(stored);
            expect(parsed.state.potentialClaimEarnings).toBe(20);
        }
    });
});
