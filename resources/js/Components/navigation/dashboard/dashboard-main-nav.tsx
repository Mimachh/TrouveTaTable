import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { Restaurant } from "@/types/restaurant";
import { router, usePage } from "@inertiajs/react";
import { Check, ImageIcon, VideoIcon, Zap } from "lucide-react";

const getDashboardMainNav = (id: string) => {
    const routes = [
        {
            href: route("dashboard", id),
            label: "Dashboard",
            active: route().current("dashboard"),
        },
        { href: "/settings", label: "Settings" },
    ];

    return routes;
};

const DashboardMainNav = ({
    className,

    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const restaurant = usePage().props.restaurant as any;
    const currentRestaurant = restaurant.data as Restaurant;
    const pageProps = usePage().props as unknown as PageProps;

    const user = pageProps.auth.user as User;
    const routes = getDashboardMainNav(currentRestaurant.id);

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className,
            )}
            {...props}
        >
            {/* {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground",
                    )}
                >
                    {route.label}
                </Link>
            ))} */}

            {!user.isFondator && (
                <Card className="border-0 py-2">
                    <CardContent className="flex items-center py-0">
                        <Button
                            type="button"
                            onClick={() => {
                                router.visit(route("prices"));
                            }}
                            variant="premium"
                            className="w-full"
                        >
                            Prendre un abonnement
                            <Zap className="ml-2 h-4 w-4 fill-white" />
                        </Button>
                    </CardContent>
                </Card>
            )}
        </nav>
    );
};

export default DashboardMainNav;
