import type { ReactNode } from "react";

type ButtonProps = {
    type: "primary" | "secondary";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
    className?: string;
    size?: "sm" | "med" | "lg";
    to?: string;
    onClick?: () => void;
};

export default function Button({
    type,
    onClick,
    className,
    children,
    to,
    ...props
}: ButtonProps) {
    const Action = to ? "a" : "button";

    const buttonStyle =
        type == "secondary"
            ? "inline-flex rounded-3xl border-2 border-solid border-blue-600 p-2 px-5 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
            : "inline-flex rounded-3xl border-2 border-solid border-black bg-gradient-to-r from-sky-blue-100 to-dark-blue-800 p-2 px-5 font-poppins text-base font-medium text-black focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75";

    if (Action === "button") {
        return (
            <Action
                className={buttonStyle + " " + className}
                onClick={onClick}
                type="button"
                {...props}
            >
                {children}
            </Action>
        );
    } else {
        <Action className={buttonStyle + className} href={to} {...props}>
            {children}
        </Action>;
    }
}
