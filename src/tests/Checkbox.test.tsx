import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "@/components/Checkbox";

describe("Checkbox component", () => {
    it("renders without crashing", () => {
        render(<Checkbox checked={false} />);
        const checkboxElement = screen.getByTestId("checkbox-container");
        expect(checkboxElement).toBeInTheDocument();
    });

    it("renders correctly when checked", () => {
        render(<Checkbox checked={true} />);
        const checkMarkIcon = screen.queryByTestId("checkmark-icon");
        const checkboxElement = screen.getByTestId("checkbox-container");
        expect(checkboxElement).toHaveClass("size-6 aspect-square flex items-center justify-center bg-green-500");
        expect(checkMarkIcon).toBeInTheDocument();
    });

    it("renders correctly when unchecked", () => {
        render(<Checkbox checked={false} />);
        const checkMarkIcon = screen.queryByTestId("checkmark-icon");
        const checkboxElement = screen.getByTestId("checkbox-container");
        expect(checkboxElement).toHaveClass(
            "size-6 aspect-square flex items-center justify-center border border-green-500"
        );
        expect(checkMarkIcon).not.toBeInTheDocument();
    });
});
