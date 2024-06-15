import { Button } from "./button";
import {
    RecurrenceType,
    useSubscriptionModal,
} from "@/hooks/useSubscriptionModal";
import SubscriptionModal from "../modales/SubscriptionModal";
import { ArrowRight } from "lucide-react";
import { Product, User } from "@/types";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { useAuthModal } from "@/hooks/usAuthModal";
import AuthModal from "../modales/AuthModal";

type Props = {
    product: Product;
    frequency?: RecurrenceType;
};
const SubscriptionModalButton = (props: Props) => {
    const { product, frequency = "monthly" } = props;
    const contactModalOnOpen = useSubscriptionModal.use.onOpen();
    const contactModalSetProduct = useSubscriptionModal.use.setProduct();
    const contactModalSetRecurrence = useSubscriptionModal.use.setRecurrence();

    const user = useUser.use.user();
    const authModalOnOpen = useAuthModal.use.onOpen();
    const onClick = () => {
        if(!user) {
            authModalOnOpen()
            toast.error("Vous devez être connecté pour continuer");
            return
        }

        contactModalOnOpen();
        contactModalSetProduct(product);
        contactModalSetRecurrence(frequency);
    }
    return (
        <>
            <Button
                type="button"
                size={"lg"}
                onClick={() => {
                    onClick()
                }}
                className="bg-welcomeBackground text-green-900 hover:bg-welcomeBackground/80"
            >
                <span>J'en profite</span>
                <span>
                    <ArrowRight className="w-5 h-5 " />
                </span>
            </Button>
            <SubscriptionModal />
            
        </>
    );
};

export default SubscriptionModalButton;
