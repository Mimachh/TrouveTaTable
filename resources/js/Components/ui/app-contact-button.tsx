import React from "react";
import { Button } from "./button";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { AppContatModal } from "../modales/AppContactModal";
import { useAppContactModal } from "@/hooks/useAppContactModal";

const AppContactButton = () => {

    const contactModalOnOpen = useAppContactModal.use.onOpen();

    return (
        <>
            <Button 
            type="button"
            size={"lg"}
            onClick={() => contactModalOnOpen()}
            className="bg-welcomeBackground text-green-900 hover:bg-welcomeBackground/80">
                <span>
                    {" "}
                    <ChatBubbleLeftRightIcon
                        className="h-6 w-6 mr-2"
                        aria-hidden="true"
                    />
                </span>
                {" "}
                Contacter nous
            </Button>
            <AppContatModal />
        </>
    );
};

export default AppContactButton;
