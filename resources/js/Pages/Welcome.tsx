import { Head, usePage } from "@inertiajs/react";
import { PageProps, Product } from "@/types";
import { useEffect, useRef } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Index from "@/Components/welcome/nav/Index";

import LandingHeader from "@/Components/welcome/landing/Header";
import Features from "@/Components/welcome/features/Features";
import StarterPrice from "@/Components/welcome/pricing/starter-price";
import NewsletterSection from "@/Components/welcome/newsletter/NewsletterSection";
import Roadmap from "@/Components/welcome/roadmap/roadmap";
import Contact from "@/Components/welcome/contact/contact";
import Footer from "@/Components/welcome/footer/footer";
import ToastProvider from "@/providers/ToastProvider";
import { useUser } from "@/hooks/useUser";
import AuthModal from "@/Components/modales/AuthModal";

type WelcomeProps = PageProps & {
    products: {
        data: Product;
    };
};

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export default function Welcome({ auth, products }: WelcomeProps) {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const setUser = useUser.use.setUser();
    useEffect(() => {
        setUser(auth.user);
    });

    const tabs = [
        { id: "Home", label: "Accueil" },
        { id: "Features", label: "Avantages" },
        { id: "Price", label: "Prix" },
        { id: "Contact", label: "Contact" },
        { id: "Roadmap", label: "Roadmap" },
    ];

    useEffect(() => {
        // Créer le script pour gtag.js
        const scriptTagManager = document.createElement("script");
        scriptTagManager.async = true;
        scriptTagManager.src =
            "https://www.googletagmanager.com/gtag/js?id=G-JQP35X3M8T";
        document.head.appendChild(scriptTagManager);

        // Initialiser le dataLayer et configurer gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", "G-JQP35X3M8T");

        // Nettoyage en retirant le script lors du démontage du composant
        return () => {
            document.head.removeChild(scriptTagManager);
        };
    }, []);

    const { csrf_token } = usePage().props;
    return (
        <ToastProvider>
            <AuthModal />
            <LazyMotion features={domAnimation}>
                <div className="min-h-[300vh]">
                    <Head title="Welcome" />
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,lightgreen,transparent)]"></div>
                        </div>
                        <Index tabs={tabs} sectionRefs={sectionRefs} />
                        <LandingHeader
                            ref={(el) => (sectionRefs.current[0] = el)}
                        />
                    </div>

                    <div className="bg-background dark:bg-foreground">
                        <Features ref={(el) => (sectionRefs.current[1] = el)} />
                        <StarterPrice
                            ref={(el) => (sectionRefs.current[2] = el)}
                            products={products.data}
                        />
                        <Contact ref={(el) => (sectionRefs.current[3] = el)} />
                        <NewsletterSection />
                        <Roadmap ref={(el) => (sectionRefs.current[4] = el)} />

                        <Footer />
                    </div>
                </div>
            </LazyMotion>
        </ToastProvider>
    );
}

// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-JQP35X3M8T"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-JQP35X3M8T');
// </script>
