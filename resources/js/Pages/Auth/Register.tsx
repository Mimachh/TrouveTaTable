import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} className="space-form-field">
                <FormFieldLayout
                    fieldName="name"
                    label="Nom"
                    error={errors.name}
                >
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                </FormFieldLayout>

                <FormFieldLayout
                    fieldName="email"
                    label="Email"
                    error={errors.email}
                >
                    <Input
                        id="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                </FormFieldLayout>

                <FormFieldLayout
                    fieldName="password"
                    label="Mot de passe"
                    error={errors.password}
                >
                    <Input
                        id="password"
                        name="password"
                        value={data.password}
                        type="password"
                        autoComplete="password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                </FormFieldLayout>

                <FormFieldLayout
                    fieldName="password_confirmation"
                    label="Confirmation du mot de passe"
                    error={errors.password_confirmation}
                >
                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        type="password"
                        autoComplete="password_confirmation"
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        required
                    />
                </FormFieldLayout>
        

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-muted-foreground hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue"
                    >
                        Déjà un compte ?
                    </Link>

                    <Button className="ms-4" disabled={processing}>
                        S'inscrire
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
