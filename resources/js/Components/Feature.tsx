import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Feature, PageProps } from "@/types";
import { Separator } from "./ui/separator";
import { Trait } from "./svg";

interface Props {
    feature: Feature;
    answer: string;
    children: React.ReactNode;
}

const FeatureLayout = (props: Props) => {
    const { feature, answer, children } = props;
    const { auth } = usePage<PageProps>().props;
    const availableCredits = auth.user.available_credits;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="header-title">
                <span className="text-primaryBlue">
                    {feature.name.substring(0, 2)}
                </span>
                    {feature.name.substring(2)}
            </h2>
            }
        >
            <Head title={feature.name} />
            <div className="mx-auto max-w-6xl mt-8 border overflow-hidden rounded-xl bg-white">
                {answer !== null && (
                    <div>
                        <p>{answer}</p>
                    </div>
                )}

                <div className="relative">
                    {availableCredits !== null &&
                        feature.required_credits > availableCredits && (
                            <div
                                className="absolute inset-0 bg-primary/80
                                flex flex-col items-center justify-center text-white font-semibold text-xl text-center
                                " // it's lock the div for protect her, and lock every interaction with the form.
                            >
                                <p className="text-4xl">🔐</p>
                                <p>
                                    Vos crédits sont insuffisant. <br /> Achetez-en pour utiliser le service.
                                </p>
                            </div>
                        )}

                    <div className=" px-6 py-5 ">
                        <div>
                            <div className="text-lg font-semibold ">
                                <div className="w-fit relative">
                                    {feature.description
                                        .split(" ")
                                        .map((word, index, arr) => {
                                            if (index >= arr.length - 2) {
                                                return (
                                                    <span key={index} className="text-primaryBlue">
                                                        {word}{" "}
                                                    </span>
                                                );
                                            } else {
                                                return <span key={index}>{word} </span>;
                                            }
                                        })}
                                    <Trait className="w-[55px] fill-primaryBlue absolute right-0" />
                                </div>
                            </div>
                            <small>
                                Requiert : {feature.required_credits} credits
                            </small>
                            <Separator className="my-4" />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FeatureLayout;
