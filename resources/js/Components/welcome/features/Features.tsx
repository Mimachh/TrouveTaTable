import { forwardRef } from "react";
import CardBook from "./CardBook";
import CardRating from "./CardRating";
import CardStoreFront from "./CardStoreFront";
import { Card, CardContent } from "@/Components/ui/card";
import { m } from "framer-motion";
const Features = forwardRef<HTMLDivElement>((props, ref) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.4 },
        },
    };

    const childrenX = {
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 },
    };

    const childrenY = {
        hidden: { opacity: 0, x: 100 },
        show: { opacity: 1, x: 0 },
    };
    return (
        <div className="w-full" id="Features" ref={ref} {...props}>
            <div className="min-h-fit bg-neutral-900 px-4 py-10 md:py-36 md:px-0 lg:h-fit">
                <div className="mx-auto flex max-w-7xl flex-col justify-center space-y-4 px-4">
                    <h2 className="header-welcome mb-5 text-2xl font-bold text-welcomeBackground/90 md:text-5xl">
                        Nos avantages
                    </h2>
                    <div className="space-y-4">
                        <div className="items-center justify-center gap-4 space-y-4 md:flex md:space-y-0">
                            <m.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: [20, -5, 0],
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.4, 0.0, 0.2, 1],
                                }}
                            >
                                <CardBook />
                            </m.div>
                            <m.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: [20, -5, 0],
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2,
                                    ease: [0.4, 0.0, 0.2, 1],
                                }}
                            >
                                <CardRating />
                            </m.div>
                        </div>
                        <div className="items-center justify-center md:flex">
                            <m.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: [20, -5, 0],
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4,
                                    ease: [0.4, 0.0, 0.2, 1],
                                }}
                            >
                                <CardStoreFront />
                            </m.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex py-10 md:py-36 max-w-7xl flex-1 flex-col justify-center px-4 md:px-0 ">
                <h3 className="header-welcome tracking-tight text-center mb-10 mt-6 text-2xl font-bold text-neutral-800 md:mt-0  md:text-5xl">
                    Est-ce que ce service est fait pour moi ?
                </h3>
                <div className="items-center justify-center p-4 md:max-w-4xl mx-auto">
                    <div className="items-center justify-between md:flex">
                        <m.div
                            variants={container}
                            initial="hidden"
                            whileInView={"show"}
                            
                            className="gap-5 space-y-5 md:grid md:grid-cols-2 md:space-y-0"
                        >
                            <m.div variants={childrenX}
                            transition={{
                               duration: 0.9,
                                type: "spring",
                            }}
                            >
                                <Card className="h-full bg-[#D87093]/5 py-5">
                                    <CardContent>
                                        <span className="font-semibold text-[#D87093]">
                                            Vous dirigez un restaurant
                                        </span>{" "}
                                        et cherchez à automatiser la
                                        confirmation des réservations et les
                                        rappels par email pour éviter les
                                        no-shows.
                                    </CardContent>
                                </Card>
                            </m.div>

                            <m.div variants={childrenY}
                             transition={{
                               duration: 0.9,
                                type: "spring",
                            }}
                            >
                                <Card className="h-full bg-welcomeBackground/40 py-5">
                                    <CardContent>
                                        <span className="font-semibold text-green-950">
                                            Vous êtes restaurateur / gérant d'un
                                            restaurant
                                        </span>{" "}
                                        avez besoin d'une présence en ligne plus
                                        forte pour attirer plus de visiteurs.
                                    </CardContent>
                                </Card>
                            </m.div>

                            <m.div variants={childrenX}
                             transition={{
                               duration: 0.9,
                                type: "spring",
                            }}
                            >
                                <Card className="h-full bg-[#4682B4]/20 py-5">
                                    <CardContent>
                                        <span className="font-semibold text-[#4682B4]">
                                            Vous avez un restaurant{" "}
                                        </span>{" "}
                                        et vous avez besoin d'un système de
                                        réservation performant et intuitif.
                                    </CardContent>
                                </Card>
                            </m.div>
                            <m.div variants={childrenY}
                             transition={{
                               duration: 0.9,
                                type: "spring",
                            }}
                            >
                                <Card className="h-full bg-[#f9a825]/15 py-5">
                                    <CardContent>
                                        <span className="font-semibold text-[#f9a825]">
                                            Votre restaurant{" "}
                                        </span>{" "}
                                        veut optimiser les réservations et
                                        faciliter la communication avec les
                                        clients grâce à un formulaire de
                                        contact.
                                    </CardContent>
                                </Card>
                            </m.div>
                        </m.div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Features;
