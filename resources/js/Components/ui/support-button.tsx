import { Button } from "./button";
import { MessageSquare } from "lucide-react";
import { SupportModal } from "../modales/SupportModal";
import { useSupportModal } from "@/hooks/useSupportModal";

interface Props {
    variant?: string;
}
const SupportButton = (props: Props) => {
    const { variant } = props;
    const contactModalOnOpen = useSupportModal.use.onOpen();
    return (
        <>
            <SupportModal />
            <Button
                variant={variant as any}
                className="col-span-3 flex w-full items-center gap-2 text-white"
                type="button"
                onClick={() => {
                    contactModalOnOpen();
                }}
            >
                <span>
                    <MessageSquare className="" />
                </span>
                <span>Contacter le support client </span>
            </Button>
        </>
    );
};

export default SupportButton;
