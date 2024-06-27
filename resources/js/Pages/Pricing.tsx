import AuthModal from "@/Components/modales/AuthModal";
import StarterPrice from "@/Components/welcome/pricing/starter-price";
import { useUser } from "@/hooks/useUser";
import ToastProvider from "@/providers/ToastProvider";
import { PageProps, Product } from "@/types";
import { LazyMotion, domAnimation } from "framer-motion";
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
        <div className="min-hscreen bg-background dark:bg-foreground w-full">
            <AuthModal />
            <StarterPrice 
            ref={(el) => (sectionRefs.current[0] = el)}
            products={products.data} />
        </div>
        </LazyMotion>
        </ToastProvider>
    );
};

export default Pricing;
