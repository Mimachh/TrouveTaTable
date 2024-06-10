import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Product, User } from "@/types";
import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface Props {
    stripeKey: string;
    intent: any;
    user: User;
    products: Product[];
    product: Product;
    recurrence: string;
}
const Create = ({
    stripeKey,
    intent,
    user,
    products,
    product,
    recurrence,
}: Props) => {
    const [stripe, setStripe] = useState<any>(null);
    const [elements, setElements] = useState<any>(null);
    const [card, setCard] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const stripeInstance = (window as any).Stripe(stripeKey);
        setStripe(stripeInstance);
    }, [stripeKey]);

    useEffect(() => {
        if (stripe) {
            const clientSecret = intent.client_secret;
            const elementsInstance = stripe.elements({ clientSecret });
            setElements(elementsInstance);

            const paymentElementOptions = {
                layout: "tabs",
            };

            const paymentElement = elementsInstance.create(
                "payment",
                paymentElementOptions
            );
            paymentElement.mount("#payment-element");
        }
    }, [stripe]);

    // useEffect(() => {
    //     const script = document.createElement("script");

    //     script.src = "https://js.stripe.com/v3/";
    //     script.onload = () => {
    //         const stripeInstance = (window as any).Stripe(stripeKey);
    //         const elementsInstance = stripeInstance.elements();
    //         const cardElement = elementsInstance.create("card");

    //         cardElement.mount("#card-element");

    //         setStripe(stripeInstance);
    //         setElements(elementsInstance);
    //         setCard(cardElement);
    //     };

    //     document.body.appendChild(script);

    //     // Nettoyer en supprimant le script lors du démontage du composant
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, [stripeKey]);

    // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(stripe);
    //     const cardHolderName = document.getElementById(
    //         "card-holder-name"
    //     ) as HTMLInputElement;
    //     const cardButton = document.getElementById(
    //         "card-button"
    //     ) as HTMLButtonElement;
    //     const clientSecret = cardButton.dataset.secret;

    //    if(stripe) {
    //     const { setupIntent, error } = await stripe.confirmCardSetup(
    //         clientSecret,
    //         {
    //             payment_method: {
    //                 card: card,
    //                 billing_details: { name: cardHolderName.value },
    //             },
    //         }
    //     );

    //     if (error) {
    //         // Display "error.message" to the user...
    //     } else {
    //         // The card has been verified successfully...
    //         console.log(setupIntent.payment_method);
    //     }
    //    }
    // };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const { error, setupIntent } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:8000/dashboard",
            },
            redirect: "if_required",
        });

        if (error) {
            if (
                error.type === "card_error" ||
                error.type === "validation_error"
            ) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } else {
            let newData: any = {
                paymentMethod: setupIntent.payment_method,
                selectedProductId: product.id,
                recurrence: recurrence,
            };

            try {
                const response = await axios.post(
                    route("subscribe.store"),
                    newData
                );
                if (response.data.stripe_status === "active") {
                    toast.success("Votre abonnement a été pris en compte");
                    window.location.href = "/dashboard";
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="font-bold text-xl mb-3">
                    Paiement de votre abonnement
                </h2>
                <div className="bg-primary/15 p-3 rounded-lg text-sm">
                    <p>⭐ 1 mois d'essai gratuit</p>
                    <p>⭐ 1 mois d'essai gratuit</p>
                    <p>⭐ Vous annulez quand vous voulez</p>
                </div>
            </div>
            {/* <form onSubmit={onSubmit} className="">
                <div className="space-y-4">
                    <FormFieldLayout
                        label="Nom du propriétaire de la carte"
                        fieldName="card-holder-name"
                    >
                        <Input
                            id="card-holder-name"
                            name="card-holder-name"
                            type="text"
                            placeholder="Nom du propriétaire de la carte"
                        />
                    </FormFieldLayout>

                    <FormFieldLayout
                        label="Numéro de carte"
                        fieldName="card-element"
                    >
                        <div
                            id="card-element"
                            className="py-3 px-4 border rounded-md bg-background"
                        ></div>
                    </FormFieldLayout>
                </div>

                <Separator className="my-8" />
                    <Button
                        className="w-full"
                        id="card-button"
                        data-secret={intent.client_secret}
                    >
                        Je m'abonne
                    </Button>
            </form> */}
            <form id="payment-form" onSubmit={onSubmit}>
                <div id="payment-element"></div>

                <Button
                    disabled={loading}
                    className="w-full my-6"
                    id="card-button"
                >
                    {loading ? (
                        <LoaderCircle className="w-6 h-6 animate animate-spin" />
                    ) : (
                        <span id="button-text">Je m'abonne</span>
                    )}
                </Button>
                <div id="payment-message" className="hidden"></div>
            </form>
        </div>
    );
};

export default Create;
