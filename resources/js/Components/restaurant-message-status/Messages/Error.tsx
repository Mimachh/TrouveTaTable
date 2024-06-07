import { X } from "lucide-react";

const Error = ({ message }: { message: string }) => {
    return (
        <p className="flex items-center gap-1">
            <span className="p-1 bg-destructive rounded-full">
                <X className="w-4 h-4 text-muted" />
            </span>
            {message}
        </p>
    );
};

export default Error