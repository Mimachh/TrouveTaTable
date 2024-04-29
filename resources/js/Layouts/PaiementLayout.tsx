import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Button } from "@/Components/ui/button";
import ToastProvider from "@/providers/ToastProvider";

export default function PaiementLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-gray-100">
                <main>{children}</main>
            </div>
        </ToastProvider>
    );
}
