import { Check } from "lucide-react";

const Success = ({ message }: { message: string }) => {
    return (
        <p className="flex items-center gap-1">
            <span className="bg-green-200 rounded-full p-1">
                <Check className="w-4 h-4 text-green-700" />
            </span>
            {message}
        </p>
    );
};

export default Success