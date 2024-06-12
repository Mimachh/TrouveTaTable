import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useRef } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Index from "@/Components/welcome/nav/Index";

import LandingHeader from "@/Components/welcome/landing/Header";
import { PrimaryFeatures } from "@/Components/welcome/features/PrimaryFeatures";
import CardBook from "@/Components/welcome/features/CardBook";
import CardRating from "@/Components/welcome/features/CardRating";
import CardStoreFront from "@/Components/welcome/features/CardStoreFront";
import { Card, CardContent } from "@/Components/ui/card";
import Features from "@/Components/welcome/features/Features";
import StarterPrice from "@/Components/welcome/pricing/starter-price";
import NewsletterSection from "@/Components/welcome/newsletter/NewsletterSection";

type WelcomeProps = PageProps & {
    restaurant: any;
};

export default function Welcome({ auth, restaurant }: WelcomeProps) {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const tabs = [
        { id: "Home", label: "Accueil" },
        { id: "Features", label: "Nos avantages" },
        { id: "Price", label: "Prix" },
        { id: "Contact", label: "Contact" },
    ];

    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-[300vh] bg-background">
                <Head title="Welcome" />

                <Index tabs={tabs} sectionRefs={sectionRefs} />
                <LandingHeader ref={(el) => (sectionRefs.current[0] = el)} />
                {/* <PrimaryFeatures /> */}
                <Features ref={(el) => (sectionRefs.current[1] = el)} />
                <StarterPrice ref={(el) => (sectionRefs.current[2] = el)} />
                <NewsletterSection />
                <div className="w-full h-[230px] bg-foreground">Footer</div>
            </div>
        </LazyMotion>
    );
}
