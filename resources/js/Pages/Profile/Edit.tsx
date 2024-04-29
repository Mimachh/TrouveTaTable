import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { FormatUserSubscription, PageProps, User } from "@/types";
import CancelSubscription from "./Partials/CancelSubscription";
import Invoices from "./Partials/Invoices";
import { Invoice } from "@/types/Invoices";

type EditProps = PageProps & {
    subscriptions: FormatUserSubscription[];
    mustVerifyEmail: boolean;
    status?: string;
    invoices?: Invoice[];
};

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    subscriptions,
    invoices
}: EditProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profil
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {auth.user?.isSub && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <CancelSubscription
                                className="max-w-xl"
                                subscriptions={subscriptions}
                            />
                        </div>
                    )}

                    {invoices && invoices.length > 0 && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <Invoices invoices={invoices}/>
                    </div>
                    )}
                    

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
