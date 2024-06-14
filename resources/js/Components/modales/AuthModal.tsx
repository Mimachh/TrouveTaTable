import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { useAuthModal } from "@/hooks/usAuthModal";
import LoginForm from "@/Pages/Auth/Partials/Login/LoginForm";

const AuthModal = () => {
    const contactModalOnClose = useAuthModal.use.onClose();
    const contactModalIsOpen = useAuthModal.use.isOpen();
    const contactModalTab = useAuthModal.use.tab();
    const [activeTab, setActiveTab] = useState(contactModalTab);
    function selectTab(tab: string) {
        setActiveTab(tab);
    }
    useEffect(() => {
        setActiveTab(contactModalTab);
    }, [contactModalTab]);
    return (
        <Modal
            title={activeTab === "login" ? "Connexion" : "Inscription"}
            isOpen={contactModalIsOpen}
            onClose={contactModalOnClose}
            dialogContentClasses="md:max-w-md md:px-8"
            dialogTitleClasses="text-xl "
            description={activeTab === "login" ? "Connectez-vous à votre compte" : "Créez un compte pour continuer"}
        >
            <div className="mt-3">
                {activeTab === "login" && (
                    <LoginForm
                        mode="modal"
                        onAlreadyHaveAnAccountClick={selectTab}
                    />
                )}
                {activeTab === "register" && (
                    <RegisterForm
                        mode="modal"
                        onAlreadyHaveAnAccountClick={selectTab}
                    />
                )}
            </div>
        </Modal>
    );
};

export default AuthModal;

import { cn } from "@/lib/utils";
import RegisterForm from "@/Pages/Auth/Partials/Register/RegisterForm";

export interface TabButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    activeTab: string;
    isPending?: boolean;
}

function TabButton({
    value,
    activeTab,
    isPending,
    children,
    ...props
}: TabButtonProps) {
    return (
        <button
            className={cn(
                activeTab === value
                    ? "bg-white text-neutral-800"
                    : "bg-gray-50 text-neutral-500",
                isPending && "opacity-50",
                "h-8 px-3 rounded-lg text-sm"
            )}
            {...props}
        >
            {isPending ? "loading" : children}
        </button>
    );
}
