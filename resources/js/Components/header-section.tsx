import React from "react";
import { Trait } from "./svg";
import { cn } from "@/lib/utils";

interface Props {
    header: React.ReactNode;
    classNames?: string;
}
const HeaderSection = ({ header, classNames }: Props) => {
    return (
        <header className={cn(classNames)}>
            {header}
        </header>
    );
};

export default HeaderSection;
