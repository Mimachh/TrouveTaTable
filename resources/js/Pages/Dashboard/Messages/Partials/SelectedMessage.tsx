import { Loader } from "@/Components/loader";
import { useSelectedMessage } from "@/hooks/useSelectedMessage";
import { Message } from "@/types/message";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    restaurant: Restaurant;
}
const SelectedMessage = (props: Props) => {
    const { restaurant } = props;
    const selectedMessage = useSelectedMessage.use.messageId();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Adresse mail copié");
    };

    useEffect(() => {
        function getMessageById() {
            axios
                .get(`/${restaurant.id}/message/${selectedMessage}/`)
                .then((response) => {
                    // console.log(response.data.data.message)
                    setMessage(response.data.data.message);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setLoading(false));

            setLoading(false);
        }

        if (selectedMessage) {
            setLoading(true);
            getMessageById();
        }
    }, [selectedMessage]);

    return (
        <div className="px-4">
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : message ? (
                <>
                    {message ? (
                        <div className="space-y-8">
                            <div>
                                <h2>
                                    <span className="underline font-semibold">
                                        De la part de : 
                                    </span>
                                    <br />
                                    <span>{message.last_name} {message.first_name}</span>
                                </h2>
                                <p className="">
                                    <span className="underline font-semibold">
                                        
                                        Adresse mail :
                                    </span>
                                    <br/>
                                    <span className="flex items-center md:gap-3 flex-wrap gap-2">
                                        {message.email}
                                        <span 
                                        onClick={() => onCopy(message.email)}
                                        className="hover:bg-secondary transition-colors cursor-pointer md:p-2 rounded"><Copy className="h-4 w-4" /></span>
                                    </span>
                                </p>
                            </div>
                            <div className="">
                                <p>
                                    <span className="underline font-semibold">
                                        Date
                                    </span>{" "}
                                    : {format(message.created_at, "EEEE dd MMMM yyyy", {locale: fr})}
                                </p>
                                <p>
                                    <span className="underline font-semibold">
                                        Objet
                                    </span>{" "}
                                    : {message.subject}
                                </p>
                            </div>

                            <div>
                                <span className="underline font-semibold">
                                    Message
                                </span>{" "}
                                : <br /> {message.content}
                            </div>
                        </div>
                    ) : (
                        <div>Pas de message sélectionné</div>
                    )}
                </>
            ) : (
                <div>Pas de message sélectionné</div>
            )}
        </div>
    );
};

export default SelectedMessage;
