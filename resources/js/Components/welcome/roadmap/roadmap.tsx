import { m } from "framer-motion";
import { forwardRef } from "react";
const data = [
    {
        date: "Juillet 2024",
        goal: "Google Analytics",
        content:
            "Intégration de votre propre Google Analytics pour suivre les performances de votre page hebergée et de votre formulaire de réservation",
    },
    {
        date: "Aout 2024",
        goal: "File d'attente",
        content:
            "En cas de restaurant complet sur un service. Vos clients pourront s'ajouter à une file d'attente, ainsi en cas d'annulation d'un autre client, ils seront automatiquement prévenus et pourront réserver la table libérée.",
    },
    {
        date: "Aout 2024",
        goal: "Emprunte bancaire",
        content:
            "Mise en place d'un enregistrement d'emprunte bancaire pour limiter les no-shows et les annulations de dernière minute. Vos clients, si l'activez, devront payer un montant fixe pour réserver leur table. Ce montant sera déduit de leur addition finale.",
    },
    {
        date: "Automne 2024",
        goal: "Click and Collect",
        content:
            "Intégration d'un système de click and collect pour permettre à vos clients de commander et de venir récupérer leur commande en restaurant. Vous pourrez, en supplément, activer le paiement en ligne de leur commande pour limiter les contacts en restaurant.",
    },
];
const Roadmap = forwardRef<HTMLDivElement>((props, ref) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.4 },
        },
    };
    const children = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };
    return (
        <div ref={ref} {...props} id="Roadmap" className="overflow-hidden">
            <div className="relative mx-auto w-full max-w-4xl px-4 py-24">
                {/* <svg
                    viewBox="0 0 1208 1024"
                    aria-hidden="true"
                    className="absolute -bottom-52 left-1/2 h-[64rem] -translate-x-1/2 translate-y-[40%] [mask-image:radial-gradient(closest-side,white,transparent)] "
                >
                    <ellipse
                        cx={604}
                        cy={512}
                        fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867s)"
                        rx={604}
                        ry={512}
                    />
                    <defs>
                        <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867s">
                            <stop stopColor="hsl(142 76.6% 73.1%)" />
                            <stop offset={1} stopColor="hsl(142 76.6% 73.1%)" />
                        </radialGradient>
                    </defs>
                </svg> */}
                <h3 className="header-welcome mb-10 text-center text-2xl font-bold text-neutral-700 md:text-5xl">
                    Roadmap
                </h3>
                <m.div
                    variants={container}
                    initial="hidden"
                    whileInView={"show"}
                    className="mx-auto max-w-4xl px-4"
                >
                    {data.map((item, index) => (
                        <m.div
                            key={index}
                            variants={children}
                            transition={{
                                duration: 1.5,
                                type: "spring",
                            }}
                            className="group relative py-6 pl-8 sm:pl-32"
                        >
                            <div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-welcomePrimary before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-welcomeBackground/90 after:bg-green-900 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
                                <time className="left-1 mb-3 inline-flex h-fit min-h-6 w-fit min-w-20 -translate-x-3 translate-y-0.5 items-center justify-center rounded-full bg-welcomeBackground px-1.5 text-xs font-semibold uppercase text-green-900 sm:absolute sm:mb-0">
                                    {item.date}
                                </time>
                                <div className="text-lg font-bold text-neutral-800">
                                    {item.goal}
                                </div>
                            </div>

                            <div className="text-green-900/80 text-sm">
                                {item.content}
                            </div>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </div>
    );
});

export default Roadmap;
