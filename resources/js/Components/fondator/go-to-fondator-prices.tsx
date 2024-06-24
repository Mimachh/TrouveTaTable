import React, { FC } from "react";

import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

interface SubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    variant?: string;
    size?: string;
}
const GoToFondatorPrices: FC<SubmitButtonProps> = ({
    disabled,
    variant,
    ...props
}) => {
    const v = variant ?? ("default" as any);
    const s = props.size ?? ("md" as any);
    return (
        <Button
            variant={v}
            {...props}
            disabled={disabled}
            type={"button"}
            size={s}
            onClick={() => {
                console.log("Go to fondator prices");
            }}
        >
            {disabled ? (
                <div className="flex w-full items-center justify-center">
                    <LoaderCircle className="animate h-6 w-6 animate-spin" />
                </div>
            ) : (
                <>Mettre à niveau</>
            )}
        </Button>
    );
};

export default GoToFondatorPrices;
