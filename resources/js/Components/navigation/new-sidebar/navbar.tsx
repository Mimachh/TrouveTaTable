import { ModeToggle } from "@/Components/ui/theme-toggle";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { useRestaurantModal } from "@/hooks/useRestaurantModal";
import RestaurantSwitcher from "@/Components/switcher/restaurant-switcher";
import { Skeleton } from "@/Components/ui/skeleton";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { router, usePage } from "@inertiajs/react";
import { Zap } from "lucide-react";
import { PageProps, User } from "@/types";
import { LocationSidebarProps } from "@/Layouts/ProfileLayout";

interface NavbarProps extends LocationSidebarProps {
    title?: string;
}

export function Navbar(props: NavbarProps) {
    const { title, location = "dashboard" } = props;

    const [resto, setResto] = useState<Restaurant[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    if (location === "dashboard") {
        const getRestaurants = () => {
            setLoading(true);
            axios
                .get(route("get.my.restaurants"))
                .then((response) => {
                    // console.log(response.data);
                    setResto(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        const restaurantModalReset = useRestaurantModal.use.reset();
        const restaurantModalSetReset = useRestaurantModal.use.setReset();
        useEffect(() => {
            getRestaurants();

            if (restaurantModalReset) {
                setLoading(true);
                getRestaurants();
                restaurantModalSetReset(false);
            }
        }, [restaurantModalReset]);
    }

    const pageProps = usePage().props as unknown as PageProps;
    const user = pageProps.auth.user as User;

    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 flex h-14 items-center sm:mx-8">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    {/* <h1 className="font-bold">{title}</h1> */}
                </div>
                {location === "dashboard" && (
                    <div>
                        {!loading ? (
                            <RestaurantSwitcher items={resto} />
                        ) : (
                            <Skeleton className="h-10 w-[200px] rounded bg-secondary" />
                        )}
                    </div>
                )}

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
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </header>
    );
}
