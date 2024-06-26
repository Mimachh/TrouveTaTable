import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    message: string;
    action: string;
}
const useToastErrorNotFondator = () => {
   
    const showErrorToast = (props: Props) => {
        const { message, action } = props;
        toast.error(message, {
            action: {
                label: action,
                onClick: () => {
                    router.visit(route('prices'))
                },
            },
        });
    };

    return { showErrorToast };
};

export default useToastErrorNotFondator;
