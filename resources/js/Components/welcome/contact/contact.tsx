import AppContactButton from "@/Components/ui/app-contact-button";
import { Card, CardContent } from "@/Components/ui/card";
import {
    BugAntIcon,
    ChatBubbleLeftRightIcon,
    ComputerDesktopIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Phone } from "lucide-react";
import { forwardRef } from "react";

const Contact = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div
        id="Contact"
        ref={ref} {...props}
        className="md:-mt-20 md:mb-36 h-fit md:h-[32rem] md:bg-transparent isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
                <h3 className="header-welcome  text-neutral-800  font-bold md:text-5xl text-2xl">
                    Nous contacter
                </h3>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Pour toutes questions, suggestions ou demandes de support,
                    n'hésitez pas à nous contacter.
                </p>
            </div>
            <div className="mx-auto mt-20 max-w-lg space-y-4 md:flex items-center justify-between">
                <div className="space-y-4 ">
                    <div className="flex gap-x-6 items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground">
                            <ChatBubbleLeftRightIcon
                                className="h-6 w-6 text-green-900"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                Conseil commercial
                            </h3>
                        </div>
                    </div>
                    <div className="flex gap-x-6 items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground">
                            <BugAntIcon
                                className="h-6 w-6 text-green-900"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                Rapporter un bug
                            </h3>
                        </div>
                    </div>
                    <div className="flex gap-x-6 items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground">
                            <ComputerDesktopIcon
                                className="h-6 w-6 text-green-900"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                Support technique
                            </h3>
                        </div>
                    </div>

                    <div className="flex gap-x-6 items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground">
                            <QuestionMarkCircleIcon
                                className="h-6 w-6 text-green-900"
                                aria-hidden="true"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold leading-7 text-gray-900">
                                Autre
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <AppContactButton />
                    <p>OU</p>
                    <div className="flex flex-col items-center gap-3">
                    <Phone className="h-6 w-6 text-green-900" />
                            <p>
                                <a href="tel:+33612345678">06 79 29 68 89</a>
                            </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Contact;
