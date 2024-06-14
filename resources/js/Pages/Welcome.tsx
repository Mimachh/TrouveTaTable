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

export default function Welcome({ auth, products }: WelcomeProps) {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const setUser = useUser.use.setUser();
    useEffect(() => {
        setUser(auth.user);
    })
    const tabs = [
        { id: "Home", label: "Accueil" },
        { id: "Features", label: "Nos avantages" },
        { id: "Price", label: "Prix" },
        { id: "Contact", label: "Contact" },
    ];
    const { csrf_token } = usePage().props;
    return (
        <ToastProvider>
            <AuthModal />
            <LazyMotion features={domAnimation}>
                <div className="min-h-[300vh] bg-background">
                    <Head title="Welcome" />

                    <Index tabs={tabs} sectionRefs={sectionRefs} />

                    <LandingHeader
                        ref={(el) => (sectionRefs.current[0] = el)}
                    />
                    <Features ref={(el) => (sectionRefs.current[1] = el)} />
                    <StarterPrice
                        ref={(el) => (sectionRefs.current[2] = el)}
                        products={products.data}
                    
                    />
                   
                    <Contact />
                    <NewsletterSection />
                    <Roadmap />
                   
                   ANIMATIONS
                   CASHIER
                
                    {/* <form action={route("credit.buy")}
                            method="POST"
                            className="w-full"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={csrf_token as string}
                                />
                                <Button className="w-full">Get started</Button>
                            </form> */}
                    <Footer />
                </div>
            </LazyMotion>
        </ToastProvider>
    );
}
