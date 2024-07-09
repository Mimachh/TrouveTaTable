import AuthModal from "@/Components/modales/AuthModal";
import StarterPrice from "@/Components/welcome/pricing/starter-price";
import { useUser } from "@/hooks/useUser";
import ToastProvider from "@/providers/ToastProvider";
import { PageProps, Product } from "@/types";
import { Link } from "@inertiajs/react";
import { LazyMotion, domAnimation } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
type PringProps = PageProps & {
    products: {
        data: Product;
    };
};
const Pricing = (props: PringProps) => {
    const { products, auth } = props;
    const setUser = useUser.use.setUser();
    useEffect(() => {
        setUser(auth.user);
    });

    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    return (
        <ToastProvider>
            <LazyMotion features={domAnimation}>
                <div className="relative min-hscreen w-full bg-background dark:bg-foreground">
                    <AuthModal />

                    <Link
                        href={route("home")}
                        className="z-10 absolute top-3 left-3 flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 transition-all hover:bg-secondary/30"
                    >
                        <span>
                            <ArrowLeft className="mr-0.5 h-3 w-3" />
                        </span>
                        <span>Retour à l'accueil</span>
                    </Link>

                    <StarterPrice
                        ref={(el) => (sectionRefs.current[0] = el)}
                        products={products.data}
                    />
                </div>
            </LazyMotion>
        </ToastProvider>
    );
};

export default Pricing;
