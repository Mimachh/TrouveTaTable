import {
    Bell,
    Calendar,
    Clock,
    Ellipsis,
    HandPlatter,
    LayoutDashboard,
    LogOut,
    MessageCircle,
    PencilIcon,
    Settings,
    Star,
    StickyNote,
    User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/Components/ui/tooltip";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Button } from "@/Components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { Restaurant } from "@/types/restaurant";
import { CollapseMenuButton } from "./collapse-menu-button";
import { LocationSidebarProps } from "@/Layouts/ProfileLayout";

interface MenuProps extends LocationSidebarProps {
    isOpen: boolean | undefined;
}

interface MenuListProps {
    groupLabel: string | null;
    menus: Array<{
        label: string;
        href: string;
        active: boolean;
        icon: any;
        submenus: Array<{
            label: string;
            href: string;
            active: boolean;
        }>;
    }>;
}
export function Menu(props: MenuProps) {
    const { isOpen, location = "dashboard" } = props;
    //   const pathname = usePathname();
    //   const menuList = getMenuList(pathname);
    
    let menuList: MenuListProps[] = [];

    if(location === "dashboard") {
        const pagProps = usePage().props;
        const { restaurant } = pagProps as any;
        const current_restaurant = restaurant.data as Restaurant;


        menuList = [
            {
                groupLabel: null,
                menus: [
                    {
                        label: "Dashboard",
                        href: route("dashboard", current_restaurant.id),
                        active: route().current("dashboard", current_restaurant.id),
                        icon: LayoutDashboard,
                        submenus: [],
                    },
                ],
            },
            {
                groupLabel: "Votre clientèle",
                menus: [
                    {
                        label: "Inscriptions Newsletter",
                        href: route(
                            "dashboard.newsletter.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.newsletter.index",
                            current_restaurant.id,
                        ),
                        icon: PencilIcon,
                        submenus: [],
                    },
                    {
                        label: "Avis clients",
                        href: route(
                            "dashboard.ratings.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.ratings.index",
                            current_restaurant.id,
                        ),
                        icon: Star,
                        submenus: [],
                    },
                    {
                        label: "Formulaire de contact",
                        href: route(
                            "dashboard.messages.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.messages.index",
                            current_restaurant.id,
                        ),
                        icon: MessageCircle,
                        submenus: [],
                    },
                ],
            },
            {
                groupLabel: "Restaurant",
                menus: [
                    {
                        label: "Ma page",
                        href: route("dashboard.page.index", current_restaurant.id),
                        active: route().current(
                            "dashboard.page.index",
                            current_restaurant.id,
                        ),
                        icon: StickyNote,
                        submenus: [],
                    },
                    {
                        label: "Tables",
                        href: route(
                            "dashboard.tables.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.tables.index",
                            current_restaurant.id,
                        ),
                        icon: HandPlatter,
                        submenus: [],
                    },
                    {
                        label: "Horaires",
                        href: route("dashboard.hours.index", current_restaurant.id),
                        active: route().current(
                            "dashboard.hours.index",
                            current_restaurant.id,
                        ),
                        icon: Clock,
                        submenus: [],
                    },
                    {
                        label: "Réservations",
                        href: route(
                            "dashboard.reservation.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.reservation.index",
                            current_restaurant.id,
                        ),
                        icon: Calendar,
                        submenus: [],
                    },
                ],
            },
            {
                groupLabel: "Paramètres",
                menus: [
                    {
                        label: "Paramètres généraux",
                        href: route(
                            "dashboard.settings.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.settings.index",
                            current_restaurant.id,
                        ),
                        icon: Settings,
                        submenus: [],
                    },
                    {
                        label: "Notifications",
                        href: route(
                            "dashboard.settings.notifications.index",
                            current_restaurant.id,
                        ),
                        active: route().current(
                            "dashboard.settings.notifications.index",
                            current_restaurant.id,
                        ),
                        icon: Bell,
                        submenus: [],
                    },
                    {
                        label: "Mon compte",
                        href: "",
                        active: route().current('profile.edit') || route().current('billings.edit'),
                        icon: User,
                        submenus: [
                            {
                                href: route('profile.edit'),
                                label: "Profil",
                                active: route().current('profile.edit')
                            },
                            {
                                href: route('billings.edit'),
                                label: "Abonnement",
                                active: route().current('billings.edit')
                            },
                        ],
                    },
                ],
            },
        ];
    }

    if(location === "profile") {
        menuList = [
            {
                groupLabel: null,
                menus: [
                    {
                        label: "Dashboard",
                        href: route("dashboard"),
                        active: route().current("dashboard"),
                        icon: LayoutDashboard,
                        submenus: [],
                    },
                ],
            },
            {
                groupLabel: "Paramètres",
                menus: [
                    {
                        label: "Mon compte",
                        href: "",
                        active: route().current('profile.edit') || route().current('billings.edit'),
                        icon: User,
                        submenus: [
                            {
                                href: route('profile.edit'),
                                label: "Profil",
                                active: route().current('profile.edit')
                            },
                            {
                                href: route('billings.edit'),
                                label: "Abonnement",
                                active: route().current('billings.edit')
                            },
                        ],
                    },
                ],
            }
        ]
    }
 
    
 

    return (
        <ScrollArea className="[&>div>div[style]]:!block">
            <nav className="mt-8 h-full w-full">
                <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
                    {menuList.map(({ groupLabel, menus }, index) => (
                        <li
                            className={cn("w-full", groupLabel ? "pt-5" : "")}
                            key={index}
                        >
                            {(isOpen && groupLabel) || isOpen === undefined ? (
                                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                                    {groupLabel}
                                </p>
                            ) : !isOpen &&
                              isOpen !== undefined &&
                              groupLabel ? (
                                <TooltipProvider>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger className="w-full">
                                            <div className="flex w-full items-center justify-center">
                                                <Ellipsis className="h-5 w-5" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p>{groupLabel}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <p className="pb-2"></p>
                            )}
                            {menus.map(
                                (
                                    {
                                        href,
                                        label,
                                        icon: Icon,
                                        active,
                                        submenus,
                                    },
                                    index,
                                ) =>
                                    submenus.length === 0 ? (
                                        <div className="w-full" key={index}>
                                            <TooltipProvider
                                                disableHoverableContent
                                            >
                                                <Tooltip delayDuration={100}>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant={
                                                                active
                                                                    ? "secondary"
                                                                    : "ghost"
                                                            }
                                                            className="mb-1 h-10 w-full justify-start"
                                                            asChild
                                                        >
                                                            <Link href={href}>
                                                                <span
                                                                    className={cn(
                                                                        isOpen ===
                                                                            false
                                                                            ? ""
                                                                            : "mr-4",
                                                                    )}
                                                                >
                                                                    <Icon
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </span>
                                                                <p
                                                                    className={cn(
                                                                        "max-w-[200px] truncate",
                                                                        isOpen ===
                                                                            false
                                                                            ? "-translate-x-96 opacity-0"
                                                                            : "translate-x-0 opacity-100",
                                                                    )}
                                                                >
                                                                    {label}
                                                                </p>
                                                            </Link>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    {isOpen === false && (
                                                        <TooltipContent side="right">
                                                            {label}
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    ) : (
                                        <div className="w-full" key={index}>
                                            <CollapseMenuButton
                                                icon={Icon}
                                                label={label}
                                                active={active}
                                                submenus={submenus}
                                                isOpen={isOpen}
                                            />
                                        </div>
                                    ),
                            )}
                        </li>
                    ))}
                    <li className="flex w-full grow items-end">
                        <TooltipProvider disableHoverableContent>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="border hover:bg-secondary/80  rounded-md mt-5 h-10 w-full justify-center flex items-center"
                                    >
                                        <span
                                            className={cn(
                                                isOpen === false ? "" : "mr-4",
                                            )}
                                        >
                                            <LogOut size={18} />
                                        </span>
                                        <p
                                            className={cn(
                                                "whitespace-nowrap",
                                                isOpen === false
                                                    ? "hidden opacity-0"
                                                    : "opacity-100",
                                            )}
                                        >
                                            Déconnexion
                                        </p>
                                    </Link>
                                </TooltipTrigger>
                                {isOpen === false && (
                                    <TooltipContent asChild side="right">
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Déconnexion
                                        </Link>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                </ul>
            </nav>
        </ScrollArea>
    );
}
