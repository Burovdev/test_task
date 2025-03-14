import CaseItem from "@/components/CaseItem";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockToggleChecked = jest.fn();
const mockAddPotentialClaimEarnings = jest.fn();
const mockDecreasePotentialClaimEarnings = jest.fn();
const mockAddItemClicks = jest.fn();
const mockAddMoreClicks = jest.fn();

const mockCaseStore = {
    checkedItems: {} as Record<string, boolean>,
    toggleChecked: mockToggleChecked,
};

const mockEarningsStore = {
    addPotentialClaimEarnings: mockAddPotentialClaimEarnings,
    decreasePotentialClaimEarnings: mockDecreasePotentialClaimEarnings,
};

const mockTrackingStore = {
    addItemClicks: mockAddItemClicks,
    addMoreClicks: mockAddMoreClicks,
};

jest.mock("@/stores/caseStore", () => ({
    __esModule: true,
    default: jest.fn((selector) => (typeof selector === "function" ? selector(mockCaseStore) : mockCaseStore)),
}));

jest.mock("@/stores/earningsStore", () => ({
    __esModule: true,
    default: jest.fn((selector) => (typeof selector === "function" ? selector(mockEarningsStore) : mockEarningsStore)),
}));

jest.mock("@/stores/trackingStore", () => ({
    __esModule: true,
    default: jest.fn((selector) => (typeof selector === "function" ? selector(mockTrackingStore) : mockTrackingStore)),
}));

jest.mock("@/helpers/date", () => ({
    timeLeftToDate: jest.fn(() => "Time Left"),
}));

jest.mock("@/lib/assets/icons", () => ({
    NoProofIcon: () => <div data-testid="no-proof-icon">NoProof</div>,
    ProofNeededIcon: () => <div data-testid="proof-needed-icon">ProofNeeded</div>,
}));

jest.mock("@/components/Checkbox", () => ({
    __esModule: true,
    default: (props: { checked: boolean }) => (
        <div data-testid="checkbox-container">{props.checked ? "checked" : "unchecked"}</div>
    ),
}));

jest.mock("@/components/DescriptionModal", () => ({
    __esModule: true,
    default: (props: { isOpen: boolean; onClose: () => void; description: string }) =>
        props.isOpen ? <div data-testid="description-modal">{props.description}</div> : null,
}));

describe("CaseItem Component", () => {
    const defaultProps = {
        id: "test-case",
        name: "Test Case",
        close_date: "2025-03-20",
        description: "This is a short description.",
        proof_needed: true,
        cost: 100,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockCaseStore.checkedItems = {};
    });

    it("renders the component with given props", () => {
        render(<CaseItem {...defaultProps} />);

        expect(screen.getByText("Test Case")).toBeInTheDocument();
        expect(screen.getByText("This is a short description.")).toBeInTheDocument();
        expect(screen.getByText("$100")).toBeInTheDocument();
        expect(screen.getByText("Time Left")).toBeInTheDocument();

        expect(screen.getByTestId("proof-needed-icon")).toBeInTheDocument();
    });

    it("handles item click correctly when item is not checked", () => {
        mockCaseStore.checkedItems = {};

        render(<CaseItem {...defaultProps} />);

        const container = screen.getByText("Test Case").closest("div");
        expect(container).toBeInTheDocument();

        if (container) {
            fireEvent.click(container);
        }

        expect(mockToggleChecked).toHaveBeenCalledWith("test-case");
        expect(mockAddPotentialClaimEarnings).toHaveBeenCalledWith(100);
        expect(mockAddItemClicks).toHaveBeenCalled();
    });

    it("handles item click correctly when item is already checked", () => {
        mockCaseStore.checkedItems = { "test-case": true };

        render(<CaseItem {...defaultProps} />);

        const container = screen.getByText("Test Case").closest("div");
        expect(container).toBeInTheDocument();

        if (container) {
            fireEvent.click(container);
        }

        expect(mockToggleChecked).toHaveBeenCalledWith("test-case");
        expect(mockDecreasePotentialClaimEarnings).toHaveBeenCalledWith(100);
        expect(mockAddItemClicks).toHaveBeenCalled();
    });

    it("truncates long description and opens modal on 'More' button click", () => {
        const longDescription =
            "Word1 Word2 Word3 Word4 Word5 Word6 Word7 Word8 Word9 Word10 Word11 Word12 Word13 Word14 Word15 Word16 Word17";

        render(<CaseItem {...defaultProps} description={longDescription} proof_needed={false} />);

        expect(screen.getByText((content) => content.includes("..."))).toBeInTheDocument();

        const moreButton = screen.getByText("More");
        expect(moreButton).toBeInTheDocument();

        fireEvent.click(moreButton);

        expect(mockAddMoreClicks).toHaveBeenCalled();

        const modal = screen.getByTestId("description-modal");
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveTextContent(longDescription);
    });
});
