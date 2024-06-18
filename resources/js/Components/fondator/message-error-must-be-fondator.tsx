import { X } from "lucide-react";
import GoToFondatorPrices from "./go-to-fondator-prices";
import { cn } from "@/lib/utils";

interface Props {
    message: string;
    classNames?: string;

}
const ErrorMustBeFondator = (props: Props) => {
    const { message, classNames } = props;
    return (
        <div className={cn("mt-1 flex items-center gap-1 p-1.5 border rounded-md  bg-destructive/40", classNames)}>
            <p className="flex items-center gap-1 text-sm tracking-tight">
                <span className="rounded-full bg-destructive p-1">
                    <X className="h-4 w-4 text-muted" />
                </span>
                {message}
            </p>
            <GoToFondatorPrices
                size="xs"
                variant="outline" />
        </div>
    );
};

export default ErrorMustBeFondator;
