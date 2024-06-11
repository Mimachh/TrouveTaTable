import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useRef } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Index from "@/Components/welcome/nav/Index";

import LandingHeader from "@/Components/welcome/landing/Header";
import { PrimaryFeatures } from "@/Components/welcome/features/PrimaryFeatures";

type WelcomeProps = PageProps & {
    restaurant: any;
};

export default function Welcome({ auth, restaurant }: WelcomeProps) {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const tabs = [
        { id: "Home", label: "Home" },
        { id: "About", label: "About" },
        { id: "Services", label: "Services" },
        { id: "Contact", label: "Contact" },
    ];

    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-[300vh] bg-background">
                <Head title="Welcome" />

                <Index tabs={tabs} sectionRefs={sectionRefs} />
                <LandingHeader ref={(el) => (sectionRefs.current[0] = el)} />
                <PrimaryFeatures />
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div
                        id="About"
                        ref={(el) => (sectionRefs.current[1] = el)}
                        className="min-h-screen"
                    >
                        About
                    </div>
                    <div
                        id="Services"
                        ref={(el) => (sectionRefs.current[2] = el)}
                        className="min-h-screen"
                    >
                        Services
                    </div>
                    <div
                        id="Contact"
                        ref={(el) => (sectionRefs.current[3] = el)}
                        className="min-h-screen"
                    >
                        Contact
                    </div>
                </div>
            </div>
        </LazyMotion>
    );
}
