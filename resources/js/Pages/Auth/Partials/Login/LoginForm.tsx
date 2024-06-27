import Checkbox from "@/Components/Checkbox";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { AuthFormProps } from "../Register/RegisterForm";
import { useAuthModal } from "@/hooks/usAuthModal";

interface Props extends AuthFormProps {
    canResetPassword?: boolean;
}
const LoginForm = (props: Props) => {
    const contactModalOnClose = useAuthModal.use.onClose();
    const {
        canResetPassword = true,
        mode,
        onAlreadyHaveAnAccountClick,
    } = props;
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
      
        post(route("login"), {
            preserveScroll: true,
            onSuccess: () => {
                if(mode == "modal") {
                    contactModalOnClose()
                }
            }
        });
    };
    return (
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
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </FormFieldLayout>
            </div>

            <div className=" mt-4 flex items-center justify-between">
                <label className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                    <span className="ms-2 text-sm ">
                        Se souvenir de moi
                    </span>
                </label>

                {canResetPassword && (
                    <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                            router.visit(route("password.request"));
                        }}
                    >
                        Mot de passe oublié ?
                    </Button>
                )}

            </div>

            <div className="pt-4 w-full text-center">
               
                <Button className="w-full" disabled={processing}>
                    Connexion
                </Button>
                <Button
                    variant={"link"}
                    type="button"
                    onClick={() => {
                        if (mode == "modal" && onAlreadyHaveAnAccountClick) {
                            onAlreadyHaveAnAccountClick("register");
                        } else {
                            router.visit(route("register"));
                        }
                    }}
                >
                    {" "}
                    Pas encore de compte ?{" "}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
