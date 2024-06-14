import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Button } from "@/Components/ui/button";
import ToastProvider from "@/providers/ToastProvider";
import StripeLoader from "@/utils/stripe-loader";

export default function PaiementLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-gray-100">
                <StripeLoader />
                <main>{children}</main>
            </div>
        </ToastProvider>
    );
}
