import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import axios from "axios";
import Create from "../subscribe/Create";
import { Product } from "@/types";
import { transformMonthPriceToYearPrice } from "@/lib/format-price";
import StripeLoader from "@/utils/stripe-loader";

const SubscriptionModal = () => {
    const contactModalOnClose = useSubscriptionModal.use.onClose();
    const contactModalIsOpen = useSubscriptionModal.use.isOpen();
    const contactModalProduct = useSubscriptionModal.use.product();
    const contactModalRecurrence = useSubscriptionModal.use.recurrence();

    const [stripeKey, setStripeKey] = useState<string>("");
    const [intent, setIntent] = useState<any>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("subscribe.modal.create", {
                        product: contactModalProduct,
                        recurrence: contactModalRecurrence,
                    })
                );
                setStripeKey(response.data.data.stripeKey);
                setIntent(response.data.data.intent);
                setProduct(response.data.data.product);
            } catch (error) {
                console.log("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Désactiver l'indicateur de chargement
            }
        };

        if (
            contactModalIsOpen &&
            contactModalProduct &&
            contactModalRecurrence
        ) {
            fetchData();
        }
    }, [contactModalIsOpen, contactModalProduct, contactModalRecurrence]);

    return (
        <Modal
            dialogTitleClasses="text-xl text-primary/80"
            title={product?.name ?? "Abonnement"}
            isOpen={contactModalIsOpen}
            onClose={contactModalOnClose}
            dialogContentClasses="bg-secondary md:max-w-md md:px-8"
        >
            <StripeLoader />
            {isLoading ? (
                <div className="flex items-center justify-center h-24">
                    <svg
                        className="animate-spin h-8 w-8 text-primary"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8v-4a4 4 0 00-4-4 4 4 0 00-4 4v4a8 8 0 00-4 6 1 1 0 11-2 0 10 10 0 012-6zm2 6a2 2 0 114 0 2 2 0 01-4 0z"
                        ></path>
                    </svg>
                </div>
            ) : (
                <div className="w-full">
                    <p>
                        {product?.formatPrices[contactModalRecurrence] &&
                        contactModalRecurrence === "annually"
                            ? transformMonthPriceToYearPrice(
                                  product?.formatPrices[contactModalRecurrence]
                              )
                            : product?.formatPrices[
                                  contactModalRecurrence
                              ]}{" "}
                        €
                    </p>
                    <Create
                        stripeKey={stripeKey}
                        intent={intent}
                        product={contactModalProduct}
                        recurrence={contactModalRecurrence}
                    />
                </div>
            )}
        </Modal>
    );
};

export default SubscriptionModal;
