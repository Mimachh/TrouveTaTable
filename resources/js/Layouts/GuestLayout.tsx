import ApplicationLogo from "@/Components/ApplicationLogo";
import ToastProvider from "@/providers/ToastProvider";
import { PropsWithChildren } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

type Props = PropsWithChildren & {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function Guest({ children, title, description }: Props) {
    return (
        <ToastProvider>
            <div className="min-h-screen flex items-center justify-center bg-secondary">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">{title}</CardTitle>
                        {description && (<CardDescription>{description}</CardDescription>)}
                    </CardHeader>
                    <CardContent className="grid gap-4">{children}</CardContent>
                </Card>
            </div>
        </ToastProvider>
    );
}
