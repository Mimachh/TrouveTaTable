import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Message } from "@/types/message";
import { Restaurant } from "@/types/restaurant";
import { format, set } from "date-fns";
import { fr } from "date-fns/locale";

import React from "react";
import SelectedMessage from "./Partials/SelectedMessage";
import { useSelectedMessage } from "@/hooks/useSelectedMessage";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { cn } from "@/lib/utils";
import EnableDisableContactMessage from "./Partials/EnableDisableContactMessage";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
    messages: {
        data: Message[];
        meta: {
            links: any[];
            current_page: number;
            last_page: number;
        };
    };
};

const Messages = (props: Props) => {
    const { messages, restaurant } = props;
    const setSelectMessageId = useSelectedMessage.use.setMessageId();
    return (
        <div className=" px-4 md:px-0 grid  md:grid-cols-3  md:divide-x md:divide-background-foreground min-h-[calc(100vh-6.5rem)]">
            <div className="grid md:col-span-1 h-full pr-1 space-y-3">
                <EnableDisableContactMessage restaurant={restaurant.data} />
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Vos messages reçus
                    </h3>

                    <div className="pt-4 pb-3">
                        <div className="flex justify-between items-center">
                            <small className=" md:w-24 w-20">Nom</small>
                            <small className=" md:w-24 w-20">Sujet</small>
                            <small className=" md:w-24 w-20">Date</small>
                        </div>
                    </div>

                    {messages.data.map((message) => (
                        <div
                            onClick={() => {
                                setSelectMessageId(message.id);
                            }}
                            key={message.id}
                            className="px-1 py-0.5 md:px-3 md:py-2.5 mb-1.5 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg"
                        >
                            <div className="flex justify-between items-center">
                                <small className="truncate md:w-24 w-20">
                                    {message.last_name} {message.first_name}
                                </small>
                                <small className="truncate md:w-24 w-20">
                                    {message.subject}
                                </small>
                                <small className="truncate md:w-24 w-20">
                                    {format(
                                        message.created_at,
                                        "dd MMMM yyyy",
                                        {
                                            locale: fr,
                                        }
                                    )}
                                </small>
                                {/* <small className="hover:bg-background/70 px-1 py-1.5 rounded transition-colors cursor-pointer">
                                <MoreVertical className="w-5 h-5 text-background-foreground" />
                            </small> */}
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 w-full mx-auto ">
                        <Pagination>
                            <PaginationContent className="flex items-center justify-between w-full">
                                {messages.meta.links.map((link, index) => {
                                    const labelNumber = Number(link.label);
                                    if (isNaN(labelNumber)) {
                                        // C'est soit "Previous" soit "Next"
                                        return (
                                            link.label ===
                                                "&laquo; Previous" && (
                                                <PaginationItem key={index}>
                                                    <PaginationPrevious
                                                        className={cn(
                                                            !link.url
                                                                ? "cursor-default text-muted hover:bg-background hover:text-muted"
                                                                : ""
                                                        )}
                                                        href={link.url}
                                                    />
                                                </PaginationItem>
                                            )
                                        );
                                    }
                                })}
                                <small>
                                    {messages.meta.current_page} /{" "}
                                    {messages.meta.last_page}
                                </small>
                                {messages.meta.links.map((link, index) => {
                                    const labelNumber = Number(link.label);
                                    if (isNaN(labelNumber)) {
                                        // C'est soit "Previous" soit "Next"
                                        return (
                                            link.label !==
                                                "&laquo; Previous" && (
                                                <PaginationItem key={index}>
                                                    <PaginationNext
                                                        href={link.url}
                                                        className={cn(
                                                            !link.url
                                                                ? "cursor-default text-muted hover:bg-background hover:text-muted"
                                                                : ""
                                                        )}
                                                    />
                                                </PaginationItem>
                                            )
                                        );
                                    }
                                })}
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
            <div className="grid md:col-span-2">
                <SelectedMessage restaurant={restaurant.data} />
            </div>
        </div>
    );
};

Messages.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Messages;
