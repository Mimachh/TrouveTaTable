import { cn } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant";
import { Link, usePage } from "@inertiajs/react";


const getDashboardMainNav = (id: string) => {
    const routes = [
        {
            href: route("dashboard", id),
            label: "Dashboard",
            active: route().current("dashboard"),
        },
        { href: "/settings", label: "Settings" },
    ];

    return routes
}

const DashboardMainNav = ({
    className,
   
    ...props
}: React.HTMLAttributes<HTMLElement>) => {

    const restaurant = usePage().props.restaurant as any;
    const currentRestaurant = restaurant.data as Restaurant;

    const routes = getDashboardMainNav(currentRestaurant.id);

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default DashboardMainNav;
