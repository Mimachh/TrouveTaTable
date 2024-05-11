import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout
        title="Connexion"
        >
            <Head title="Connexion" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
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
                            className="mt-1 block w-full py-3 border"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </FormFieldLayout>
                </div>

                <div className="mt-4">
                    <FormFieldLayout
                        label="Mot de passe"
                        fieldName="password"
                        error={errors.password}
                    >
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full py-3 border"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </FormFieldLayout>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Se souvenir de moi
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-muted-foreground hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue"
                        >
                            Mot de passe oublié ?
                        </Link>
                    )}

                    <Button className="ms-4" disabled={processing}>
                        Connexion
                    </Button>
                </div>
                <Link
                href={route("register")}
                className="underline text-sm text-muted-foreground hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue"
                >Pas encore de compte ? </Link>
            </form>
        </GuestLayout>
    );
}
