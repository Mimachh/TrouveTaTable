import SubmitButton from "@/Components/ui/submit-button";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    stripeKey: string;
    intent: any;
    onReset: () => void;
}
const AddNewPaymentMethod = (props: Props) => {
    const { stripeKey, intent, onReset } = props;
    const [stripe, setStripe] = useState<any>(null);
    const [elements, setElements] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stripeInstance = (window as any).Stripe(stripeKey);
        setStripe(stripeInstance);
        setLoading(false);
    }, [stripeKey]);

    useEffect(() => {
        if (stripe) {
            setLoading(true);
            const clientSecret = intent.client_secret;
            const elementsInstance = stripe.elements({ clientSecret });
            setElements(elementsInstance);

            const paymentElementOptions = {
                layout: "tabs",
            };

            const paymentElement = elementsInstance.create(
                "payment",
                paymentElementOptions,
            );
            paymentElement.mount("#payment-element");

            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }, [stripe]);
    const { data, processing, post, reset } = useForm({
        paymentMethod: "",
    });
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error, setupIntent } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:8000/billings",
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
            data.paymentMethod = setupIntent.payment_method
            post(route("billings.payment-method.create-new"), {
                ...data,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Votre méthode de paiement a été ajoutée.");
                    onReset()
                },
                onError: (e) => {
                    reset();
                    toast.error("Une erreur est survenue. Veuillez réessayer.");
                },
            });
        }
    };

    return (
        <div>
            <form id="payment-form" onSubmit={onSubmit}>
                <div id="payment-element"></div>

                <SubmitButton
                    disabled={processing || loading}
                    className="my-6 w-full"
                    id="card-button"
                    type="submit"
                >
                    Ajouter
                </SubmitButton>
                <div id="payment-message" className="hidden"></div>
            </form>
        </div>
    );
};

export default AddNewPaymentMethod;
