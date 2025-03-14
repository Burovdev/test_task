import { render, screen } from "@testing-library/react";
import CaseList from "@/components/CaseList";
import "@testing-library/jest-dom";

jest.mock("@/components/CaseItem", () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid="case-item">{name}</div>,
}));

jest.mock("@/data/cases.json", () => [
    {
        id: "1",
        name: "Case One",
        close_date: "2025-01-01",
        description: "Description one",
        proof_needed: false,
        cost: 50,
    },
    {
        id: "2",
        name: "Case Two",
        close_date: "2025-02-01",
        description: "Description two",
        proof_needed: true,
        cost: 75,
    },
]);

describe("CaseList Component", () => {
    it("renders a grid with the correct number of CaseItem components", () => {
        const { container } = render(<CaseList />);

        expect(container.firstChild).toHaveClass("grid");

        const caseItems = screen.getAllByTestId("case-item");
        expect(caseItems).toHaveLength(2);

        expect(caseItems[0]).toHaveTextContent("Case One");
        expect(caseItems[1]).toHaveTextContent("Case Two");
    });
});
