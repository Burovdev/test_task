import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";

const mockEarningsStore = {
    potentialClaimEarnings: 100,
};

const mockTrackingStore = {
    itemClicks: 5,
    moreClicks: 3,
};

jest.mock("@/stores/earningsStore", () => ({
    __esModule: true,
    default: jest.fn((selector) => (typeof selector === "function" ? selector(mockEarningsStore) : mockEarningsStore)),
}));

jest.mock("@/stores/trackingStore", () => ({
    __esModule: true,
    default: jest.fn((selector) => (typeof selector === "function" ? selector(mockTrackingStore) : mockTrackingStore)),
}));

jest.mock("@/helpers/cn", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cn: (...args: any[]) => args.join(" "),
}));

describe("Header Component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("renders initial earnings and tracking info", () => {
        render(<Header />);
        expect(screen.getByText("Case clicks: 5")).toBeInTheDocument();
        expect(screen.getByText("More data clicks: 3")).toBeInTheDocument();
        expect(screen.getByText("$100")).toBeInTheDocument();
    });

    it("shows the difference when earnings change then reverts to new earnings", () => {
        const { rerender } = render(<Header />);
        expect(screen.getByText("$100")).toBeInTheDocument();

        mockEarningsStore.potentialClaimEarnings = 150;
        rerender(<Header />);

        expect(screen.getByText("+50")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(screen.getByText("$150")).toBeInTheDocument();
    });
});
