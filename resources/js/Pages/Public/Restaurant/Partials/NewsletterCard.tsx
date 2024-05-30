import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import SubmitButton from "@/Components/ui/submit-button";
import { Restaurant } from "@/types/restaurant";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

interface Props {
    restaurant: Restaurant
}
const NewsletterCard = (props: Props) => {
    const {restaurant} = props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        email: ""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("newsletter.subscribe", { restaurant: restaurant.id}), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success("Vous êtes bien inscrit à notre newsletter, merci !");
            },
            onError: () => {
                toast.error("Une erreur est survenue.");
            },
        });
    };

    return (
        <Card
            x-chunk="card-newsletter"
            className="bg-background h-fit w-full shadow"
        >
            <CardHeader className="px-7">
                <CardTitle className="text-lg">Newsletter</CardTitle>
                <p className="text-[14px] tracking-tight">Inscrivez-vous à notre newsletter pour rester informé de notre actualité.</p>
            </CardHeader>
            <CardContent>
            <form onSubmit={submit}>
                <FormFieldLayout
                label="Votre mail"
                fieldName="email"
                error={errors.email}
                >
                    <div className="w-full h-fit relative">
                        <Input
                        type="email"
                        className="w-full h-11 rounded-3xl"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        />
                        <SubmitButton
                        disabled={processing}
                        type="button"
                        onClick={submit}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-9 rounded-3xl"
                        >Enregistrer</SubmitButton>
                    </div>
                </FormFieldLayout>
            </form>
            </CardContent>
        </Card>
    );
};

export default NewsletterCard;
