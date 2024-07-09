import { PropsWithChildren, ReactNode, useEffect } from "react";
import { FlashMessage, PageProps, User } from "@/types";
import ToastProvider from "@/providers/ToastProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";
import ProfileNavigation from "@/Components/navigation/profile/sidebar/ProfileNavigation";
import ProfileNavbar from "@/Components/navigation/profile/navbar/Navbar";
import { Navbar } from "@/Components/navigation/new-sidebar/navbar";
import { Sidebar } from "@/Components/navigation/new-sidebar/sidebar";
import { useSidebarStore } from "@/hooks/sidebar/useSidebarStore";
import { useSidebarToggle } from "@/hooks/sidebar/useSidebarToggle";
import { cn } from "@/lib/utils";

type DasboardLayoutProps = PropsWithChildren & {
    header?: ReactNode;
    children: ReactNode;
};


export interface LocationSidebarProps {
    location?: "profile" | "dashboard";
}

export default function ProfileLayout({
    header,
    children,
}: DasboardLayoutProps) {



    const props = usePage().props as unknown as PageProps;

    const user = props.auth.user as User;

    const flash = usePage().props.flash as FlashMessage;

    useEffect(() => {
        if (flash?.message) {
            setTimeout(() => {
                toast.success(flash.message);
            }, 500);
        }
        if (flash?.error) {
            // console.log("erreruruurur");
            setTimeout(() => {
                toast.error(flash.error);
            }, 500);
        }
    }, [flash?.message, flash?.error]);

    


    const sidebar = useSidebarStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;
    
    return (
        <ThemeProvider>
            <ToastProvider>
                <ModalProvider />

                <Sidebar location="profile" />
                <main
                    className={cn(
                        "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
                        sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
                    )}
                >
                    <Navbar location='profile' />
                    <section className="relative z-0 flex min-h-[calc(100vh_-_56px)] flex-col gap-5 p-2 md:p-10">
                        {header}
                        {children}
                    </section>
                </main>
            </ToastProvider>
        </ThemeProvider>
    );
}
