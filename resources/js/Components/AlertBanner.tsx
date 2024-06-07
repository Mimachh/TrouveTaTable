import { AlertCircle } from "lucide-react";
import React from "react";
import { LogoTomate } from "./svg";

interface Props {
    children: React.ReactNode
}
const AlertBanner = (props: Props) => {
    const {children} = props;
    return (
        <div className="bg-destructive/20 text-destructive py-3 p-2 rounded-lg w-full my-3 flex items-center">
            <LogoTomate className="w-12 h-12" />
            {children}
        </div>
    );
};

export default AlertBanner;
