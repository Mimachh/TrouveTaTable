import { forwardRef, useState } from "react";
import { Product } from "@/types";
import ProductCard from "./product-card";
import SlideTabs from "./slide-tabs";
export interface Frequency {
    value: string;
    label: string;
    priceSuffix: string;
}

const frequencies: Frequency[] = [
    { value: "monthly", label: "Mensuel", priceSuffix: "/mois" },
    { value: "annually", label: "Annuel", priceSuffix: "/mois" },
];
interface StarterPriceProps {
    products: Product;
}

const StarterPrice = forwardRef<HTMLDivElement, StarterPriceProps>(
    ({ products, ...props }, ref) => {
        const [frequency, setFrequency] = useState(frequencies[0]);
        return (
            <div
                ref={ref}
                {...props}
                id="Price"
                className="isolate overflow-hidden"
            >
                <div className="flow-root bg-neutral-900 pb-16 pt-24 sm:pt-32 lg:pb-0">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="relative z-10">
                            <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
                                Prix spécial de lancement.
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
                                Un prix unique, tout inclus, tout illimité. Pas
                                de frais cachés. Pas de surprises. Vous avez
                                accès à toutes les fonctionnalités actuelles et
                                à futures de notre plateforme.
                            </p>
                            <div className="mt-16 flex justify-center">
                                <fieldset aria-label="Payment frequency">
                                <SlideTabs
                                    frequencies={frequencies}
                                    activeFrequency={frequency}
                                    setActiveFrequency={setFrequency}
                                />
                                  
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
                            <ProductCard
                                products={products}
                                frequency={frequency}
                            />
                        </div>
                    </div>
                </div>
                <div className="relative bg-background  md:pt-24">
                   
                    {/* <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            
                </div> */}
                </div>
            </div>
        );
    }
);

export default StarterPrice;
