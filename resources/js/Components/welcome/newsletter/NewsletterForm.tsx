import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";
import SubmitButton from "@/Components/ui/submit-button";
import { useForm } from "@inertiajs/react";
import { MailIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const NewsletterForm = () => {
    const { data, setData, processing, errors, post, reset } = useForm({
        email: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("newsletter.app.subscribe"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Vous êtes inscrit à notre newsletter");
                reset()
            },
            onError: (errors) => {
                toast.error("Une erreur s'est produite lors de l'inscription");
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <InputError message={errors.email} className="mt-2 font-semibold" />
            <div className="relative w-full ">
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="email@gmail.com"
                    className="z-0 rounded-full border w-full pl-10 focus:ring-2 focus:ring-teal-500 relative mt-4 h-11 bg-background"
                />
                 <MailIcon className="w-5 h-5 absolute left-3 text-neutral-500 top-1/2 -translate-y-1/2" />
                <SubmitButton
                    disabled={processing}
                    type="submit"
                    className="rounded-full absolute right-1 top-1/2 -translate-y-1/2 h-9"
                >
                    Inscription
                </SubmitButton>
            </div>
        </form>
    );
};

export default NewsletterForm;
