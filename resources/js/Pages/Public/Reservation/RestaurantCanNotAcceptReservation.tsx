import { Button } from "@/Components/ui/button";
import ResaLayout from "@/Layouts/ResaLayout";
import { useContactRestaurantModal } from "@/hooks/useContactRestaurantModal";
import { Restaurant } from "@/types/restaurant";
import { Head } from "@inertiajs/react";

interface Props {
    restaurant: {
        data: Restaurant;
    };
}
const RestaurantCanNotAcceptReservation = (props: Props) => {
    const { restaurant } = props;
    const resto = restaurant.data;

    const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
    const contactModalSetRestaurant =
        useContactRestaurantModal.use.setRestaurant();
    return (
        <ResaLayout
            title={
                <div className="flex items-end gap-2 justify-center">
                    <h2 className="">Oups !</h2>{" "}
                </div>
            }
            name={
                "Le restaurant ne peut pas accepter de réservation pour le moment."
            }
        >
            <Head title="Réservation impossible" />
            <div className="w-full text-center">
                <small className="mb-4">
                    Veuillez contacter le restaurant pour plus d'informations.
                </small>
                {resto.accept_messages ? (
                    <Button
                    variant={"primaryBlue"}
                    className="w-full col-span-3 text-white"
                    type="button"
                    onClick={() => {
                        contactModalOnOpen();
                        contactModalSetRestaurant(resto);
                    }}
                >
                    Contacter
                </Button>
                ) : (
                    <></>
                )}
            </div>
        </ResaLayout>
    );
};

export default RestaurantCanNotAcceptReservation;
