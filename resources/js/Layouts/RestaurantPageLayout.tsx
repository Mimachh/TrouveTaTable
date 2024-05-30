import ToastProvider from "@/providers/ToastProvider";
import { LazyMotion, domAnimation } from "framer-motion";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
    children: React.ReactNode;
}
const RestaurantPageLayout = (props: Props) => {
    const { children } = props;
    return (
        <LazyMotion features={domAnimation}>
        <ToastProvider>
            <div className="bg-secondary">{children}</div>
        </ToastProvider>
        </LazyMotion>
    );
};

export default RestaurantPageLayout;
