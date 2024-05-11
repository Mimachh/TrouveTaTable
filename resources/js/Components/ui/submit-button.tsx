import React, { FC } from "react";
import { Button } from "./button";
import { LoaderCircle } from "lucide-react";

interface SubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}
const SubmitButton: FC<SubmitButtonProps> = ({ children, disabled, type, ...props } ) => {
    return (
        <Button
        {...props}
        disabled={disabled}
        type={type || "button"}
        >
            {disabled ? (
                <div className="w-full flex items-center justify-center">
                    <LoaderCircle className="w-6 h-6 animate animate-spin" />
                </div>
            ) : (
                <>{children}</>
            )}
        </Button>
    );
};

export default SubmitButton;
