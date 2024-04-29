import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { FlashMessage, PageProps } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";



type DashboardProps = PageProps & {
    flash?: FlashMessage;
};
export default function Dashboard({ auth, flash }: DashboardProps) {
    useEffect(() => {
        if (flash?.message) {
            setTimeout(() => {
                toast.success(flash.message);
            }, 500);
        }
    }, []);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="header-title">
                    <span className="text-primaryBlue">Da</span>shboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
