import { FC } from "react";

interface IconProp {
    className?: string;
    width?: string;
    height?: string;
    color?: string;
}
export const ProofNeededIcon: FC<IconProp & React.SVGProps<SVGSVGElement>> = ({
    className,
    height,
    width,
    color = "currentColor",
    ...props
}) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="8" cy="8" r="7.4" stroke="#FF4A4A" strokeWidth="1.2"></circle>
            <path
                d="M12 9.33333L9.33333 11.9982L4.44533 12C4.32777 12.0005 4.21483 11.9543 4.13133 11.8715C4.04782 11.7887 4.00059 11.6762 4 11.5587V4.44133C4 4.19778 4.19778 4 4.44133 4H11.5587C11.8022 4 12 4.20267 12 4.44533V9.33333ZM11.1111 4.88889H4.88889V11.1111H8.44444V8.88889C8.44446 8.78003 8.48442 8.67496 8.55676 8.59361C8.6291 8.51226 8.72878 8.46029 8.83689 8.44755L8.88889 8.44444L11.1111 8.444V4.88889ZM10.7427 9.33289L9.33333 9.33333V10.7418L10.7427 9.33289Z"
                fill={color}
            ></path>
            <path d="M2.5 2.25L13.5 13.25" stroke="#FF4A4A" strokeWidth="1.2"></path>
        </svg>
    );
};

export const NoProofIcon: FC<IconProp & React.SVGProps<SVGSVGElement>> = ({
    className,
    height,
    width,
    color = "currentColor",
    ...props
}) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 9.33333L9.33333 11.9982L4.44533 12C4.32777 12.0005 4.21483 11.9543 4.13133 11.8715C4.04782 11.7887 4.00059 11.6762 4 11.5587V4.44133C4 4.19778 4.19778 4 4.44133 4H11.5587C11.8022 4 12 4.20267 12 4.44533V9.33333ZM11.1111 4.88889H4.88889V11.1111H8.44444V8.88889C8.44446 8.78003 8.48442 8.67496 8.55676 8.59361C8.6291 8.51226 8.72878 8.46029 8.83689 8.44755L8.88889 8.44444L11.1111 8.444V4.88889ZM10.7427 9.33289L9.33333 9.33333V10.7418L10.7427 9.33289Z"
                fill={color}
            ></path>
        </svg>
    );
};

export const CheckMarkIcon: FC<IconProp & React.SVGProps<SVGSVGElement>> = ({
    className,
    height,
    width,
    color = "currentColor",
    ...props
}) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill={color}
                d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
            />
        </svg>
    );
};

export const CloseIcon: FC<IconProp & React.SVGProps<SVGSVGElement>> = ({
    className,
    height,
    width,
    color = "currentColor",
    ...props
}) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill={color}
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            />
        </svg>
    );
};
