import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, usePage } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import ProfileLayout from "@/Layouts/ProfileLayout";

type EditProps = PageProps & {
    mustVerifyEmail: boolean;
    status?: string;
};

function Edit({
    auth,
    mustVerifyEmail,
    status,
}: EditProps) {
    const { csrf_token } = usePage().props;
    return (
        <>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto space-y-6 ">
                    <div className="bg-secondary p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-secondary p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-secondary p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}
Edit.layout = (page: React.ReactNode) => {
    return (
        <ProfileLayout
            header={
                <h1 className="p-2 text-4xl font-semibold tracking-wide">
                    Profil
                </h1>
            }
        >
            {page}
        </ProfileLayout>
    );
};

export default Edit;
