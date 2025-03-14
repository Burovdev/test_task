import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DescriptionModal from "@/components/DescriptionModal";

describe("DescriptionModal Component", () => {
    const description = "This is the modal description.";
    const onClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("does not render when isOpen is false", () => {
        render(<DescriptionModal isOpen={false} onClose={onClose} description={description} />);

        expect(screen.queryByText("Criteria")).not.toBeInTheDocument();
        expect(screen.queryByText(description)).not.toBeInTheDocument();
    });

    it("renders when isOpen is true and displays header and description", () => {
        render(<DescriptionModal isOpen={true} onClose={onClose} description={description} />);

        expect(screen.getByText("Criteria")).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("calls onClose when the close button is clicked", () => {
        render(<DescriptionModal isOpen={true} onClose={onClose} description={description} />);

        const closeButton = screen.getByRole("button");
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });
});
