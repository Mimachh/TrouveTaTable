import { PropsWithChildren, ReactNode, useEffect } from "react";
import { FlashMessage, PageProps, User } from "@/types";
import ToastProvider from "@/providers/ToastProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navigation from "@/Components/navigation/sidebar/Navigation";
import DashboardNavbar from "@/Components/navigation/dashboard/dashboard-navbar";
import { ModalProvider } from "@/providers/ModalProvider";
import { useRestaurantModal } from "@/hooks/useRestaurantModal";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

type DasboardLayoutProps = PropsWithChildren & {
    header?: ReactNode;
    children: ReactNode;
};
export default function DashboardLayout({
    header,
    children,
}: DasboardLayoutProps) {
    const restaurantModalOnClose = useRestaurantModal.use.onClose();

    const props = usePage().props as unknown as PageProps;

    const user = props.auth.user as User;

    const flash = usePage().props.flash as FlashMessage;
    useEffect(() => {
        restaurantModalOnClose();
    }, []);

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
    return (
        <ThemeProvider>
            <ToastProvider>
                <ModalProvider />
                <main className="w-full h-full flex flex-row relative">
                    <Navigation />
                    <section className="w-full ml-20">
                        <DashboardNavbar />
                        <section className="flex flex-col p-2 md:p-10 gap-5 relative z-0">
                            {header}

                            {children}
                        </section>
                    </section>
                </main>
            </ToastProvider>
        </ThemeProvider>
    );
}
