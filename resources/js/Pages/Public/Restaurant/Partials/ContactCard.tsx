import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import ContactButton from "@/Components/ui/contact-button";
import { Restaurant } from "@/types/restaurant";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
    restaurant: Restaurant;
}
const ContactCard = (props: Props) => {
    const { restaurant } = props;

    const onCopy = ({ id, text }: { id: string | null; text: string }) => {
        if (id) {
            navigator.clipboard.writeText(id);
            toast.success(text);
        }
    };
    return (
        <Card
            x-chunk="card-description"
            className="bg-background h-fit w-full shadow"
        >
            <CardHeader className="px-7">
                <CardTitle className="text-lg">Nous contacter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-1.5">
                    <p>
                        <span className="font-medium underline">
                            Notre adresse :
                        </span>{" "}
                        {restaurant.address}, {restaurant.zip},{" "}
                        {restaurant.city}
                    </p>

                    <p className="flex items-center gap-2.5">
                        <span className="font-medium underline">
                            Téléphone :
                        </span>{" "}
                        {restaurant.phone}{" "}
                        {restaurant.phone && (
                            <span>
                                <Copy
                                    onClick={() =>
                                        onCopy({
                                            id: restaurant.phone ?? "",
                                            text: "Numéro de téléphone copié",
                                        })
                                    }
                                    className="w-4 h-4 text-primary/90 cursor-pointer"
                                />
                            </span>
                        )}
                    </p>
                    <p className="flex items-center gap-2.5">
                        <span className="font-medium underline">Mail :</span>{" "}
                        {restaurant.email}{" "}
                        <span>
                            <Copy 
                            onClick={() =>
                                onCopy({
                                    id: restaurant.email ?? "",
                                    text: "Mail copié",
                                })
                            }
                            className="w-4 h-4 text-primary/90 cursor-pointer" />
                        </span>
                    </p>
                </div>

                {restaurant.accept_messages === true && (
                    <ContactButton restaurant={restaurant} variant="default" />
                )}
            </CardContent>
        </Card>
    );
};

export default ContactCard;
