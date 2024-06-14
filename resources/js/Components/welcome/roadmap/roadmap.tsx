import React from "react";
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
const Roadmap = () => {
    return (
        <div className=" overflow-hidden">
            <div className="relative py-24 px-4 w-full max-w-4xl mx-auto">
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
                <h3 className="text-center mb-10 header-welcome text-neutral-700  font-bold md:text-5xl text-2xl">
                    Roadmap
                </h3>
                <div className=" px-4 max-w-4xl mx-auto">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="relative pl-8 sm:pl-32 py-6 group"
                        >
                            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-welcomePrimary sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-green-900 after:border-4 after:box-content after:border-welcomeBackground/90 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                                <time className="sm:absolute left-1 -translate-x-3 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-fit min-w-20 h-fit px-1.5 min-h-6 mb-3 sm:mb-0 text-green-900 bg-welcomeBackground rounded-full">
                                    {item.date}
                                </time>
                                <div className="text-neutral-800 text-xl font-bold ">
                                    {item.goal}
                                </div>
                            </div>

                            <div className="text-green-900/80">
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
