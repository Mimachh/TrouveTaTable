import { FormEventHandler, useState } from "react";

import { Modal } from "@/Components/ui/modal";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Loader } from "@/Components/loader";
import { useForm } from "@inertiajs/react";
import FormFieldLayout from "../layout/form-field-layout";
import { useContactRestaurantModal } from "@/hooks/useContactRestaurantModal";
import SubmitButton from "../ui/submit-button";
import { toast } from "sonner";
import { MessageCircle, Phone } from "lucide-react";

export const ContactRestaurant = () => {
    const contactModalOnClose = useContactRestaurantModal.use.onClose();
    const contactModalIsOpen = useContactRestaurantModal.use.isOpen();
    const contactModalSetRestaurant =
        useContactRestaurantModal.use.setRestaurant();
    const contactModalRestaurant = useContactRestaurantModal.use.restaurant();

    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("restaurant.store"), {
            onStart: () => {
                setLoading(true);
            },
            onSuccess: () => {
                setLoading(false);
                contactModalOnClose();
                reset();
                toast.success("Message envoyé avec succès.");
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    return (
        <Modal
            dialogTitleClasses="text-xl text-primary/80"
            title={`Contacter le restaurant ${contactModalRestaurant?.name}`}
            // description="En cas de besoin contactez-nous. Nous vous répondrons dans les plus brefs délais."
            isOpen={contactModalIsOpen}
            onClose={contactModalOnClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <h2
                            className="text-lg font-semibold
                        flex items-center justify-center gap-3
                        "
                        >
                            <MessageCircle
                                className="
                        transform scale-x-[-1] text-neutral-600
                        h-6 w-6 "
                            />
                            <span>Par message</span>
                        </h2>
                        <form onSubmit={onSubmit}>
                            {loading ? (
                                <div className="flex justify-center">
                                    <Loader />
                                </div>
                            ) : (
                                <div>
                                    <FormFieldLayout
                                        label="Nom du restaurant"
                                        fieldName="name"
                                        error={errors.name}
                                    >
                                        <Input
                                            id="name"
                                            type="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full py-3 border"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                    </FormFieldLayout>

                                    <div className="pt-6 space-x-2 flex items-center justify-center w-full">
                                        <Button
                                            type="button"
                                            className="w-full"
                                            disabled={loading}
                                            variant="outline"
                                            onClick={contactModalOnClose}
                                        >
                                            Annuler
                                        </Button>
                                        <SubmitButton
                                            disabled={loading}
                                            variant="primaryBlue"
                                            className="w-full  text-white"
                                            type="submit"
                                        >
                                            Envoyer
                                        </SubmitButton>
                                    </div>
                                </div>
                            )}
                        </form>

                        {contactModalRestaurant &&
                            contactModalRestaurant.phone && (
                                <div className="w-full text-center tracking-wide">
                                    <p className="">OU</p>
                                    <h2
                                        className="text-lg font-semibold
                         flex items-center justify-center gap-3
                         "
                                    >
                                        <Phone className="h-6 w-6 text-neutral-600" />
                                        <span>Par téléphone</span>
                                    </h2>
                                    <div className="">
                                        <a
                                            href={`tel:${contactModalRestaurant?.phone}`}
                                            className="text-primaryBlue underline"
                                        >
                                            {contactModalRestaurant?.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
