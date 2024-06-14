import SubscriptionModalButton from "@/Components/ui/subscription-modal-button";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import { formatPrice, formatPriceFromCents } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { ArrowRight, CheckIcon } from "lucide-react";
import React from "react";

interface Props {
    products: Product;
    frequency: {
        label: string;
        value: string;
        priceSuffix: string;
    };
}
const ProductCard = (props: Props) => {
    const { products, frequency } = props;
    return (
        <div
            className={cn(
                products.mostPopular
                    ? "z-10 bg-secondary shadow-xl ring-1 ring-green-900/10"
                    : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
                "relative rounded-2xl md:col-start-2 border border-welcomePrimary"
            )}
        >
            <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                <div className="flex items-center justify-between">
                    <h3
                        id={products.id}
                        className={cn(
                            products.mostPopular
                                ? "text-gray-900"
                                : "text-white",
                            "text-sm font-semibold leading-6"
                        )}
                    >
                        {products.name}
                    </h3>
                    {products.mostPopular ? (
                        <p className="rounded-full bg-welcomeBackground text-green-900 px-3.5 py-2 text-xs font-semibold leading-5">
                            Spécial Lancement
                        </p>
                    ) : null}
                </div>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                    <div className="mt-2 flex items-center gap-x-4">
                        <div
                            className={cn(
                                products.mostPopular
                                    ? "text-gray-900"
                                    : "text-white",
                                "text-4xl font-bold tracking-tight"
                            )}
                        >
                            <PricingContent
                                tier={products}
                                frequency={frequency}
                            />{" "}
                        </div>
                        <div className="text-sm leading-5">
                            <p
                                className={
                                    products.mostPopular
                                        ? "text-gray-900"
                                        : "text-white"
                                }
                            >
                                EUR
                            </p>
                            <p
                                className={cn(
                                    products.mostPopular
                                        ? "text-gray-500"
                                        : "text-gray-400",
                                    "capitalize"
                                )}
                            >
                                {`Abonnement `}{" "}
                                <span className="lowercase">
                                    {frequency.label}
                                </span>
                            </p>
                        </div>
                    </div>
                    {/* <a
                href={tier.href}
                aria-describedby={tier.id}
                className={cn(
                    tier.featured
                        ? "bg-welcomeBackground text-green-900 transition-colors shadow-sm hover:bg-welcomePrimary/80 hover:text-white focus-visible:outline-welcomePrimary"
                        : "bg-white/10 hover:bg-white/20 focus-visible:outline-white text-white",
                    "rounded-full flex items-center gap-2 justify-center px-3 py-2 text-center text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                )}
            >
                <span>J'en profite</span>
                <span>
                    <ArrowRight className="w-5 h-5 " />
                </span>
            </a> */}
                    <ButtonLink tier={products} frequency={frequency} />
                </div>
                <div className="mt-8 flow-root sm:mt-10">
                    <ul
                        role="list"
                        className={cn(
                            products.mostPopular
                                ? "divide-gray-900/5 border-gray-900/5 text-gray-600"
                                : "divide-white/5 border-white/5 text-white",
                            "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
                        )}
                    >
                        {JSON.parse(products.feature).map(
                            (f: any, index: number) => (
                                <li key={index} className="flex gap-x-3 py-2">
                                    <CheckIcon
                                        className={cn(
                                            products.mostPopular
                                                ? "text-welcomePrimary"
                                                : "text-gray-500",
                                            "h-6 w-5 flex-none"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {f}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

function PricingContent({ tier, frequency }: { tier: any; frequency: any }) {
    if (!tier || !frequency) {
        return null;
    }

    const price = JSON.parse(tier.price)?.[frequency.value] ?? 0;

    const isContactLink = price === -1;
    const priceText = isContactLink ? null : `${formatPriceFromCents(price, false)} €`;

    return (
        <div className="w-full">
            {priceText && (
                <>
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                        {priceText}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                        {frequency.priceSuffix}
                    </span>
                </>
            )}
        </div>
    );
}

const ButtonLink = ({ tier, frequency }: { tier: any; frequency: any }) => {
    if (!tier || !frequency) {
        return null;
    }

    const href = "/subscribe/" + `${tier.id}?recurrence=${frequency.value}`;

    return (
        <>
            {/* <a
                href={href}
                aria-describedby={tier.id}
                className={cn(
                    tier.mostPopular
                        ? "bg-welcomeBackground text-green-900 transition-colors shadow-sm hover:bg-welcomePrimary/80 hover:text-white focus-visible:outline-welcomePrimary"
                        : "bg-white/10 hover:bg-white/20 focus-visible:outline-white text-white",
                    "rounded-full flex items-center gap-2 justify-center px-3 py-2 text-center text-sm font-semibold leading-6  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                )}
            >
                <span>J'en profite</span>
                <span>
                    <ArrowRight className="w-5 h-5 " />
                </span>
            </a> */}

            <SubscriptionModalButton product={tier} frequency={frequency.value}  />
        </>
    );
};
