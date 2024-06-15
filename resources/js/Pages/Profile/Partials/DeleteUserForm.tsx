import { useRef, useState, FormEventHandler } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
// import Modal from '@/Components/Modal';
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Modal } from "@/Components/ui/modal";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-foreground">
                    Supprimer mon compte
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Une fois le compte supprimé, toutes les données sont définitivement perdues. Veuillez télécharger toutes les données ou informations que vous souhaitez conserver.

                </p>
            </header>

            <Button variant={"destructive"} size={"sm"} onClick={confirmUserDeletion}>
                Supprimer
            </Button>

            {/* <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal> */}

            <Modal
                title="Êtes-vous sûr de vouloir supprimer votre compte ?"
                description="Une fois le compte supprimé, les données seront définitivement perdues. Veuillez entrer votre mot de passe pour confirmer la suppression."
                isOpen={confirmingUserDeletion}
                onClose={closeModal}
            >
                <div className="space-x-2 flex items-center justify-end w-full">
                    <form onSubmit={deleteUser} className=" w-full">
                        <div className="w-full">
                            <FormFieldLayout
                                label="Mot de passe"
                                fieldName="password"
                            >
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Mot de passe"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </FormFieldLayout>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton className="bg-primary hover:bg-primary/80 transition-colors text-muted py-2.5 font-normal text-xs" onClick={closeModal}>Annuler</SecondaryButton>

                            <DangerButton
                                className="ms-3 font-normal text-xs"
                                disabled={processing}
                            >
                                Supprimer le compte
                            </DangerButton>
                        </div>
                    </form>
                </div>
            </Modal>



{/* 
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="p-6">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <h2 className="text-lg font-semibold leading-none tracking-tight">
                            Êtes-vous sûr de vouloir supprimer votre compte ?
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Une fois le compte supprimé, les données seront
                            définitivement perdues. Veuillez entrer votre mot de
                            passe pour confirmer la suppression.
                        </p>
                    </div>
                    <div className="space-x-2 flex items-center justify-end w-full">
                        <form onSubmit={deleteUser} className=" w-full">
                            <div className="w-full">
                                <FormFieldLayout
                                    label="Mot de passe"
                                    fieldName="password"
                                >
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Mot de passe"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                </FormFieldLayout>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button onClick={closeModal}>Annuler</Button>

                                <Button
                                    variant={"destructive"}
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Supprimer le compte
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal> */}
        </section>
    );
}
