import { ContactRestaurant } from "@/Components/modales/ContactRestaurant";
import { useContactRestaurantModal } from "@/hooks/useContactRestaurantModal";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
};

const Index = (props: Props) => {
    const { restaurant } = props;

    const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
    const contactModalSetRestaurant =
        useContactRestaurantModal.use.setRestaurant();
    const contactModalIsOpen = useContactRestaurantModal.use.isOpen();
    useEffect(() => {
        contactModalOnOpen()
        contactModalSetRestaurant(restaurant.data)
    }, []);
    return (
        <div className="w-full min-h-screen bg-primary/50 flex items-center justify-center">
            <Head
                title={`Page de contact du restaurant ${restaurant.data.name}`}
            />

            {!contactModalIsOpen && (
                <p className="p-3 rounded-md bg-background">Si vous nous avez transmis un message nous vous recontacterons au plus vite !</p>
            )}
            <ContactRestaurant />
        </div>
    );
};

export default Index;
