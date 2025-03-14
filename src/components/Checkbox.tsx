import { cn } from "@/helpers/cn";
import { CheckMarkIcon } from "@/lib/assets/icons";
import React from "react";

interface CheckBoxProps {
    checked: boolean;
}

const Checkbox: React.FC<CheckBoxProps> = ({ checked }) => {
    return (
        <div
            data-testid="checkbox-container"
            className={cn(
                `size-6 aspect-square flex items-center justify-center`,
                checked ? "bg-green-500" : "border border-green-500"
            )}
        >
            {checked && <CheckMarkIcon data-testid="checkmark-icon" className="text-white size-5" />}
        </div>
    );
};

export default Checkbox;
