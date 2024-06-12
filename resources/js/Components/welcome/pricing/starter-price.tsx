import { forwardRef, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const frequencies = [
    { value: "monthly", label: "Mensuel" },
    { value: "annually", label: "Annuel" },
];
const tiers = [
    {
        name: "Lancement",
        id: "tier-starter",
        href: "#",
        featured: true,
        description: "All your essential business finances, taken care of.",
        price: { monthly: "25", annually: "20" },
        mainFeatures: [
            "Page vitrine hébergée",
            "Sytème de notation vérifiée",
            "Système de réservation en ligne",
            "Email de notifications",
            "Email de rappel aux clients",
            "Formulaire de contact intégré",
            "Accès illimité à toutes les fonctionnalités actuelles et futures"
        ],
        mostPopular: true,
    },
];


const StarterPrice = forwardRef<HTMLDivElement>((props, ref) => {
    const [frequency, setFrequency] = useState(frequencies[0]);

    return (
        <div 
        ref={ref}
        {...props}
        id="Price"
        className="isolate overflow-hidden">
            <div className="flow-root bg-neutral-900 pb-16 pt-24 sm:pt-32 lg:pb-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative z-10">
                        <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
                            Prix spécial de lancement.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
                            Un prix unique, tout inclus, tout illimité. Pas de frais cachés. Pas de surprises. Vous avez accès à toutes les fonctionnalités actuelles et à futures de notre plateforme.
                        </p>
                        <div className="mt-16 flex justify-center">
                            <fieldset aria-label="Payment frequency">
                            <div className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-muted">
                                {frequencies.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setFrequency(option)}
                                        className={cn(
                                            frequency.value === option.value
                                                ? "bg-welcomeBackground text-green-900"
                                                : "",
                                            "cursor-pointer rounded-full px-2.5 py-1"
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
                        <svg
                            viewBox="0 0 1208 1024"
                            aria-hidden="true"
                            className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
                        >
                            <ellipse
                                cx={604}
                                cy={512}
                                fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
                                rx={604}
                                ry={512}
                            />
                            <defs>
                                <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                                    <stop stopColor="#D87093" />
                                    <stop offset={1} stopColor="green" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div
                            className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-welcomePrimary-40 lg:ring-1 lg:ring-white/10"
                            aria-hidden="true"
                        />
                         {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={cn(
                                    tier.featured
                                        ? "z-10 bg-secondary shadow-xl ring-1 ring-green-900/10"
                                        : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
                                    "relative rounded-2xl md:col-start-2 border border-welcomePrimary"
                                )}
                            >
                                <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                                    <div className="flex items-center justify-between">
                                        <h3
                                            id={tier.id}
                                            className={cn(
                                                tier.featured
                                                    ? "text-gray-900"
                                                    : "text-white",
                                                "text-sm font-semibold leading-6"
                                            )}
                                        >
                                            {tier.name}
                                        </h3>
                                        {tier.mostPopular ? (
                                            <p className="rounded-full bg-welcomeBackground text-green-900 px-3.5 py-2 text-xs font-semibold leading-5">
                                               Spécial Lancement
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                                        <div className="mt-2 flex items-center gap-x-4">
                                            <p
                                                className={cn(
                                                    tier.featured
                                                        ? "text-gray-900"
                                                        : "text-white",
                                                    "text-4xl font-bold tracking-tight"
                                                )}
                                            >
                                                {
                                                    tier.price[
                                                        frequency.value as keyof typeof tier.price
                                                    ]
                                                } €
                                            </p>
                                            <div className="text-sm leading-5">
                                                <p
                                                    className={
                                                        tier.featured
                                                            ? "text-gray-900"
                                                            : "text-white"
                                                    }
                                                >
                                                    EUR
                                                </p>
                                                <p
                                                    className={cn(tier.featured
                                                        ? "text-gray-500"
                                                        : "text-gray-400", "capitalize"
                                                ) }
                                                >{`Abonnement `} <span className="lowercase">{frequency.label}</span></p>
                                            </div>
                                        </div>
                                        <a
                                            href={tier.href}
                                            aria-describedby={tier.id}
                                            className={cn(
                                                tier.featured
                                                    ? "bg-welcomeBackground text-green-900 transition-colors shadow-sm hover:bg-welcomePrimary/80 hover:text-white focus-visible:outline-welcomePrimary"
                                                    : "bg-white/10 hover:bg-white/20 focus-visible:outline-white text-white",
                                                "rounded-full flex items-center gap-2 justify-center px-3 py-2 text-center text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                            )}
                                        >
                                            <span>
                                            J'en profite
                                            </span>
                                            <span>
                                                <ArrowRight className="w-5 h-5 " />
                                            </span>
                                        </a>
                                    </div>
                                    <div className="mt-8 flow-root sm:mt-10">
                                        <ul
                                            role="list"
                                            className={cn(
                                                tier.featured
                                                    ? "divide-gray-900/5 border-gray-900/5 text-gray-600"
                                                    : "divide-white/5 border-white/5 text-white",
                                                "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
                                            )}
                                        >
                                            {tier.mainFeatures.map(
                                                (mainFeature) => (
                                                    <li
                                                        key={mainFeature}
                                                        className="flex gap-x-3 py-2"
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                tier.featured
                                                                    ? "text-welcomePrimary"
                                                                    : "text-gray-500",
                                                                "h-6 w-5 flex-none"
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {mainFeature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative bg-background  md:pt-24">
                {/* <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            
                </div> */}
            </div>
        </div>
    );
});

export default StarterPrice;