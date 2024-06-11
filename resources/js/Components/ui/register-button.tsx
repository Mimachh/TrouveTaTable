import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Props {
    className?: string;

}
const RegisterButton = (props: Props) => {
    const { className } = props;
    return (
        <Button variant={"default"} className={cn("px-5 rounded-full text-muted/90 bg-neutral-800", className)} type="button">
            <span>Inscription</span>
            <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
    );
};

export default RegisterButton;
