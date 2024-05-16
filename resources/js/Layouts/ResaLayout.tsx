import ToastProvider from "@/providers/ToastProvider";
import { PropsWithChildren } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { ContactRestaurant } from "@/Components/modales/ContactRestaurant";

type Props = PropsWithChildren & {
    name: string;
    title: React.ReactNode;
    children: React.ReactNode;
}

export default function ResaLayout({ 
    children,
    name,
    title,
}: Props) {
    return (
        <ToastProvider>
            <div className="bg-foreground
            min-h-screen flex items-center justify-center">
                <Card className="mx-auto max-w-md md:max-w-md md:min-w-[400px] pt-5 pb-5">
                    <CardHeader className="pb-6 text-center">
                        <CardTitle className="text-2xl">
                           {title}
                        </CardTitle>
                        <CardDescription>
                            {name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="max-w-sm mx-auto">
                       {children}
                    </CardContent>
                </Card>
            </div>
            <ContactRestaurant />
        </ToastProvider>
    );
}
