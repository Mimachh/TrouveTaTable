import { useRestaurantModal } from "@/hooks/useRestaurantModal";
import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useEffect } from "react";

const CreateRestaurant = () => {
    const onOpen = useRestaurantModal.use.onOpen();
    const isOpen = useRestaurantModal.use.isOpen();
    
    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen]);

    return (
        <>
            <ThemeProvider>
                <ModalProvider />
            </ThemeProvider>
        </>
    );
};

export default CreateRestaurant;
