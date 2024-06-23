import { FormEventHandler, useEffect, useState } from "react";

import { Modal } from "@/Components/ui/modal";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import FormFieldLayout from "../layout/form-field-layout";
import SubmitButton from "../ui/submit-button";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { useSupportModal } from "@/hooks/useSupportModal";

export const SupportModal = () => {
    const contactModalOnClose = useSupportModal.use.onClose();
    const contactModalIsOpen = useSupportModal.use.isOpen();

    const { data, setData, post, processing, errors, reset } = useForm({
        subject: "",
        message: "",
    });

 
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("support.send"), {
            onSuccess: () => {
                contactModalOnClose();
                reset();
                toast.success("Message envoyé avec succès.");
            },
            onError: (e) => {
            },
        });
    };

    return (
        <Modal
            dialogTitleClasses="text-xl text-primary/80"
            title={`Contacter le support client`}
            // description="En cas de besoin contactez-nous. Nous vous répondrons dans les plus brefs délais."
            isOpen={contactModalIsOpen}
            onClose={contactModalOnClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <form onSubmit={onSubmit}>
                                <div>
                                    <div className="space-y-1.5">
                                      
                                            <FormFieldLayout
                                                label="Sujet"
                                                fieldName="subject"
                                                error={errors?.subject ?? ""}
                                            >
                                                <Input
                                                    id="subject"
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Sujet"
                                                    value={data.subject}
                                                   
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
                                            fieldName="message"
                                            error={errors?.message ?? ""}
                                        >
                                            <Textarea
                                                placeholder="Contenu de votre message"
                                                className="resize-none"
                                                onChange={(e) => {
                                                    setData(
                                                        "message",
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
                                            disabled={processing}
                                            variant="outline"
                                            onClick={contactModalOnClose}
                                        >
                                            Annuler
                                        </Button>
                                        <SubmitButton
                                            disabled={processing}
                                            variant="primaryBlue"
                                            className="w-full  text-white"
                                            type="submit"
                                        >
                                            Envoyer
                                        </SubmitButton>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
