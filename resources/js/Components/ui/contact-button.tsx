import { useContactRestaurantModal } from "@/hooks/useContactRestaurantModal";
import { Restaurant } from "@/types/restaurant";
import { Button } from "./button";
import { ContactRestaurant } from "../modales/ContactRestaurant";
import { MessageSquare } from "lucide-react";

interface Props {
    restaurant: Restaurant;
    variant?: string;
}
const ContactButton = (props: Props) => {
    const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
    const contactModalSetRestaurant =
        useContactRestaurantModal.use.setRestaurant();

    const { restaurant, variant = "primaryBlue" } = props;
    return (
        <>
         <ContactRestaurant />
            <Button
                variant={variant as any}
                className="w-full col-span-3 text-white flex items-center gap-2"
                type="button"
                onClick={() => {
                    contactModalOnOpen();
                    contactModalSetRestaurant(restaurant);
                }}
            >
                <span><MessageSquare className="" /></span>
                <span>Contacter le restaurant</span>
                
            </Button>
        </>
    );
};

export default ContactButton;
