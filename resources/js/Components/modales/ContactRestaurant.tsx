import { FormEventHandler, useEffect, useState } from "react";

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
import { Textarea } from "../ui/textarea";

export const ContactRestaurant = () => {
    const contactModalOnClose = useContactRestaurantModal.use.onClose();
    const contactModalIsOpen = useContactRestaurantModal.use.isOpen();
    const contactModalSetRestaurant =
        useContactRestaurantModal.use.setRestaurant();
    const contactModalRestaurant = useContactRestaurantModal.use.restaurant();

    const [loading, setLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        last_name: "",
        first_name: "",
        email: "",
        phone: "",
        subject: "",
        content: "",
        restaurant_id: contactModalRestaurant?.id,
    });

    useEffect(() => {
        if (contactModalRestaurant) {
            setData("restaurant_id", contactModalRestaurant.id);
        }
    }, [contactModalRestaurant]);
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("message.send"), {
            onStart: () => {
                setLoading(true);
            },
            onSuccess: () => {
                setLoading(false);
                contactModalOnClose();
                reset();
                toast.success("Message envoyé avec succès.");
            },
            onError: (e) => {
                setLoading(false);
                console.log(errors, e);
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
                            className="text-md font-semibold
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
                                    <div className="space-y-1.5">
                                        <div className="grid grid-cols-2 gap-1">
                                            <FormFieldLayout
                                                label="Nom"
                                                fieldName="last_name"
                                                error={errors.last_name}
                                            >
                                                <Input
                                                    id="last_name"
                                                    type="text"
                                                    name="last_name"
                                                    placeholder="Votre nom"
                                                    value={data.last_name}
                                                    className="mt-1 block w-full py-3 border"
                                                    onChange={(e) =>
                                                        setData(
                                                            "last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormFieldLayout>
                                            <FormFieldLayout
                                                label="Prénom"
                                                fieldName="first_name"
                                                error={errors.first_name}
                                            >
                                                <Input
                                                    id="first_name"
                                                    type="text"
                                                    name="first_name"
                                                    placeholder="Votre prénom"
                                                    value={data.first_name}
                                                    className="mt-1 block w-full py-3 border"
                                                    onChange={(e) =>
                                                        setData(
                                                            "first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormFieldLayout>
                                        </div>

                                        <div className="grid grid-cols-2 gap-1">
                                            <FormFieldLayout
                                                label="Mail"
                                                fieldName="email"
                                                error={errors.email}
                                            >
                                                <Input
                                                    id="email"
                                                    type="mail"
                                                    name="email"
                                                    placeholder="Votre adresse mail"
                                                    value={data.email}
                                                    className="mt-1 block w-full py-3 border"
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormFieldLayout>
                                            <FormFieldLayout
                                                label="Téléphone"
                                                fieldName="phone"
                                                error={errors.phone}
                                            >
                                                <Input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Votre numéro de téléphone"
                                                    value={data.phone}
                                                    className="mt-1 block w-full py-3 border"
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </FormFieldLayout>
                                        </div>

                                        <FormFieldLayout
                                            label="Sujet"
                                            fieldName="subject"
                                            error={errors.subject}
                                        >
                                            <Input
                                                id="subject"
                                                type="text"
                                                name="subject"
                                                placeholder="Sujet de votre message"
                                                value={data.subject}
                                                className="mt-1 block w-full py-3 border"
                                                onChange={(e) =>
                                                    setData(
                                                        "subject",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormFieldLayout>

                                        <FormFieldLayout
                                            label="Message"
                                            fieldName="content"
                                            error={errors.content}
                                        >
                                            <Textarea
                                                placeholder="Contenu de votre message"
                                                className="resize-none"
                                                onChange={(e) => {
                                                    setData(
                                                        "content",
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormFieldLayout>
                                    </div>

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
                                            disabled={loading || processing}
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
                                        className="text-md font-semibold
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
