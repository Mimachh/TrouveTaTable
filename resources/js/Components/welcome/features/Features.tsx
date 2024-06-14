import { forwardRef } from "react";
import CardBook from "./CardBook";
import CardRating from "./CardRating";
import CardStoreFront from "./CardStoreFront";
import { Card, CardContent } from "@/Components/ui/card";

const Features = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div className="w-full"
        id="Features"
        ref={ref}
        {...props}
        >
            <div

                className=" bg-neutral-900 lg:h-fit py-10 px-4 md:px-0 min-h-screen"
            >
                <div className="space-y-4 max-w-7xl px-4 mx-auto flex flex-col justify-center">
                    <h2 className="header-welcome text-welcomeBackground/90 md:text-5xl text-2xl font-bold  mb-5">
                        Nos avantages
                    </h2>
                    <div className="space-y-4">
                        <div className="md:flex items-center justify-center gap-4 space-y-4 md:space-y-0">
                            <CardBook />
                            <CardRating />
                        </div>
                        <div className="md:flex items-center justify-center">
                            <CardStoreFront />
                        </div>
                    </div>
                </div>
            </div>

            <div className=" min-h-screen lg:max-h-[600px] md:px-0 max-w-7xl mx-auto px-4 flex flex-col flex-1 justify-center">
                <h3 className="mb-10 header-welcome mt-6 md:mt-0 text-neutral-800  md:w-2/3 font-bold md:text-5xl text-2xl">
                    Est-ce que ce service est fait pour moi ?
                </h3>
                <div className="p-4  items-center justify-center">
                    <div className="md:flex items-center justify-between">
                        <div className="md:grid md:grid-cols-2 md:w-2/3 gap-5 space-y-5 md:space-y-0">
                            <Card className="bg-[#D87093]/5 py-5">
                                <CardContent>
                                    <span className="font-semibold text-[#D87093]">
                                        Vous dirigez un restaurant
                                    </span>{" "}
                                    et cherchez à automatiser la confirmation
                                    des réservations et les rappels par email
                                    pour éviter les no-shows.
                                </CardContent>
                            </Card>
                            <Card className="bg-welcomeBackground/40 py-5">
                                <CardContent>
                                    <span className="font-semibold text-green-950">
                                        Vous êtes restaurateur / gérant d'un
                                        restaurant
                                    </span>{" "}
                                    avez besoin d'une présence en ligne plus
                                    forte pour attirer plus de visiteurs.
                                </CardContent>
                            </Card>
                            <Card className="bg-[#4682B4]/20 py-5">
                                <CardContent>
                                    <span className="font-semibold text-[#4682B4]">
                                        Vous avez un restaurant{" "}
                                    </span>{" "}
                                    et vous avez besoin d'un système de
                                    réservation performant et intuitif.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="bg-[#f9a825]/15 py-5">
                                    <span className="font-semibold text-[#f9a825]">
                                        Votre restaurant{" "}
                                    </span>{" "}
                                    veut optimiser les réservations et faciliter
                                    la communication avec les clients grâce à un
                                    formulaire de contact.
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:w-1/3">
                            IMAGE ICI MAIS JE SAIS PAS QUOI
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Features;
