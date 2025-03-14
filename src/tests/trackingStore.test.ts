import useTrackingStore from "@/stores/trackingStore";
import { act } from "@testing-library/react";

describe("useTrackingStore", () => {
    beforeEach(() => {
        localStorage.clear();
        useTrackingStore.setState({ moreClicks: 0, itemClicks: 0 });
    });

    it("should have initial moreClicks = 0 and itemClicks = 0", () => {
        const { moreClicks, itemClicks } = useTrackingStore.getState();
        expect(moreClicks).toBe(0);
        expect(itemClicks).toBe(0);
    });

    it("should increment moreClicks", () => {
        act(() => {
            useTrackingStore.getState().addMoreClicks();
        });
        const { moreClicks } = useTrackingStore.getState();
        expect(moreClicks).toBe(1);
    });

    it("should increment itemClicks", () => {
        act(() => {
            useTrackingStore.getState().addItemClicks();
        });
        const { itemClicks } = useTrackingStore.getState();
        expect(itemClicks).toBe(1);
    });

    it("should persist to localStorage", () => {
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

        act(() => {
            useTrackingStore.getState().addMoreClicks();
        });

        expect(setItemSpy).toHaveBeenCalledWith("tracking-storage", expect.any(String));

        const stored = localStorage.getItem("tracking-storage");
        expect(stored).not.toBeNull();
        if (stored) {
            const parsed = JSON.parse(stored);
            expect(parsed.state.moreClicks).toBe(1);
        }
    });
});
