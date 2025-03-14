import useCaseStore from "@/stores/caseStore";
import { act } from "@testing-library/react";

describe("useCaseStore", () => {
    beforeEach(() => {
        localStorage.clear();

        useCaseStore.setState({ checkedItems: {} });
    });

    it("has an empty initial checkedItems object", () => {
        const { checkedItems } = useCaseStore.getState();
        expect(checkedItems).toEqual({});
    });

    it("toggles an item from undefined/false to true", () => {
        act(() => {
            useCaseStore.getState().toggleChecked("abc");
        });
        const { checkedItems } = useCaseStore.getState();
        expect(checkedItems["abc"]).toBe(true);
    });

    it("toggles an item from true to false", () => {
        act(() => {
            useCaseStore.getState().toggleChecked("abc");
            useCaseStore.getState().toggleChecked("abc");
        });
        const { checkedItems } = useCaseStore.getState();
        expect(checkedItems["abc"]).toBe(false);
    });

    it("resets all checked items", () => {
        act(() => {
            useCaseStore.getState().toggleChecked("abc");
            useCaseStore.getState().toggleChecked("xyz");
            useCaseStore.getState().resetChecked();
        });
        const { checkedItems } = useCaseStore.getState();
        expect(checkedItems).toEqual({});
    });

    it("persists to localStorage", () => {
        const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

        act(() => {
            useCaseStore.getState().toggleChecked("abc");
        });

        expect(setItemSpy).toHaveBeenCalledWith("case-store", expect.any(String));

        const stored = localStorage.getItem("case-store");
        expect(stored).not.toBeNull();
        if (stored) {
            const parsed = JSON.parse(stored);
            expect(parsed.state.checkedItems["abc"]).toBe(true);
        }
    });
});
