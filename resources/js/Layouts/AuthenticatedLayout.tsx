import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import ToastProvider from "@/providers/ToastProvider";
import MainNav from "@/Components/navigation/Main-Nav";
import HeaderSection from "@/Components/header-section";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    
    return (
        <ToastProvider>
            <div className="min-h-screen bg-gray-100">
                <MainNav user={user} />
                {header && <HeaderSection header={header} />}

                <main>{children}</main>
            </div>
        </ToastProvider>
    );
}
