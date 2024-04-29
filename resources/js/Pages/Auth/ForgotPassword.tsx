import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="mb-4 text-sm text-muted-foreground">
                Mot de passe oublié ? Pas de problème. Indiquez-nous votre adresse e-mail et nous vous enverrons un lien de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <FormFieldLayout
                    label="Email"
                    fieldName="email"
                    error={errors.email}
                >
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </FormFieldLayout>
                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        Envoyer le lien de réinitialisation
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
