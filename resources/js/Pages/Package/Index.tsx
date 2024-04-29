import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";

const Index = ({ auth, packages, features, success, error }: any) => {
    const availableCredits = auth.user.available_credits;
    console.log({packages})
    const { csrf_token } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="header-title">
                    <span className="text-primaryBlue">Packages</span>
                </h2>
            }
        >
            <Head title="Your credits" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="rounded-lg bg-emerald-500 text-gray-100 p-3 mb-4">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="rounded-lg bg-red-500 text-gray-100 p-3 mb-4">
                            {error}
                        </div>
                    )}

                    <h3>Vous avez {availableCredits} credits.</h3>
                </div>

                <div className="flex items-center justify-center gap-3 px-5">
                    {packages.data.map((item: any) => (
                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">
                                {item.name}
                            </h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                Relevant for multiple users, extended & premium
                                support.
                            </p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">
                                    {item.price} €
                                </span>

                                <span className="mr-2 text-sm font-extrabold">
                                    {item.credits} credits
                                </span>
                            </div>
                            <ul
                                role="list"
                                className="mb-8 space-y-4 text-left"
                            >
                                <li className="flex items-center space-x-3"></li>
                                {features.data.map((feature: any) => (
                                    <li className="flex items-center space-x-3">
                                    
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span>{feature.name}</span>
                                </li>
                                ))}
                                
                                
                            </ul>
                            <form action={route("credit.buy", item)}
                            method="POST"
                            className="w-full"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value={csrf_token}
                                />
                                <Button className="w-full">Get started</Button>
                            </form>
                            
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
