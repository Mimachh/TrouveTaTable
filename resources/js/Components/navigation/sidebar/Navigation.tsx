import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import {
    CalendarDaysIcon,
    ChartBarIcon,
    ChartPieIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    DocumentCheckIcon,
    DocumentIcon,
    Square2StackIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import ProjectLink from "./ProjectLink";
import ProjectNavigation from "./ProjectNavigation";
import { usePage } from "@inertiajs/react";
import { Restaurant } from "@/types/restaurant";
import { HandPlatter, LayoutDashboard, LayoutDashboardIcon, Settings } from "lucide-react";

const containerVariants = {
    close: {
        width: "5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
};

const svgVariants = {
    close: {
        rotate: 360,
    },
    open: {
        rotate: 180,
    },
};

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    const containerControls = useAnimationControls();
    const svgControls = useAnimationControls();

    useEffect(() => {
        if (isOpen) {
            containerControls.start("open");
            svgControls.start("open");
        } else {
            containerControls.start("close");
            svgControls.start("close");
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const nav = document.querySelector("nav");
            const projectNav = document.querySelector("#project-navigation"); // Assurez-vous d'ajouter cet id à votre composant ProjectNavigation

            if (selectedProject === null) {
                if (nav && !nav.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            } else {
                if (
                    nav &&
                    !nav.contains(event.target as Node) &&
                    projectNav &&
                    !projectNav.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                    setSelectedProject(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedProject]);

    const handleOpenClose = () => {
        setIsOpen(!isOpen);
        setSelectedProject(null);
    };

    const props = usePage().props;
    const { restaurant } = props as any;
    const current_restaurant = restaurant.data as Restaurant;

    


    return (
        <>
            <div className="sticky z-10 top-0 left-0 h-fit">
                <div className="min-h-screen">
                <motion.nav
                    variants={containerVariants}
                    animate={containerControls}
                    initial="close"
                    className="bg-secondary border border-r flex flex-col p-5 justify-start absolute gap-24 top-0 left-0 min-h-full h-fit shadow"
                >
                    <div className="flex flex-row w-full justify-between place-items-center h-full">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
                        
                        <button
                            className="p-1 rounded-full flex"
                            onClick={() => handleOpenClose()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-8 h-8 stroke-secondary-foreground/80"
                            >
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    variants={svgVariants}
                                    animate={svgControls}
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 overflow-hidden">
                        <NavigationLink
                            name="Dashboard"
                            href={route("dashboard", current_restaurant.id)}
                            active={route().current("dashboard", current_restaurant.id)}
                        >
                            <LayoutDashboard className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-8" />
                        </NavigationLink>
                        <ProjectLink
                            name="Utilisateurs"
                            setSelectedProject={setSelectedProject}
                            className="text-red-600 flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-muted stroke-secondary-foreground/60 text-secondary-foreground/60 hover:text-muted place-items-center gap-3 hover:bg-secondary-foreground/80 transition-colors duration-100"
                        >
                            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </ProjectLink>

                        <NavigationLink name="Messages"
                            href={route("dashboard.messages.index", current_restaurant.id)}
                            active={route().current("dashboard.messages.index", current_restaurant.id)}
                        >
                            <ChatBubbleLeftRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>

                        <NavigationLink name="Ma page"
                        href={route("dashboard.page.index", current_restaurant.id)}
                        active={route().current("dashboard.page.index", current_restaurant.id)}
                        >
                            <DocumentIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>

                        <NavigationLink
                         name="Tables"
                         href={route("dashboard.tables.index", current_restaurant.id)}
                         active={route().current("dashboard.tables.index", current_restaurant.id)}
                        >
                            <HandPlatter className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-8"  />
                        </NavigationLink>

                        <NavigationLink
                            name="Horaires"
                            href={route("dashboard.hours.index", current_restaurant.id)}
                            active={route().current("dashboard.hours.index", current_restaurant.id)}
                        >
                            <ClockIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>
                        
                        <NavigationLink
                            name="Réservations"
                            href={route("dashboard.reservation.index", current_restaurant.id)}
                            active={route().current("dashboard.reservation.index", current_restaurant.id)}
                        >
                            <CalendarDaysIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>

                      
                        <ProjectLink
                            name="Paramètres"
                            active={
                                route().current("dashboard.settings.index", current_restaurant.id) ||
                                route().current("dashboard.settings.notifications.index", current_restaurant.id)
                            }
                            setSelectedProject={setSelectedProject}
                            className="text-red-600 flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-muted stroke-secondary-foreground/60 text-secondary-foreground/60 hover:text-muted place-items-center gap-3 hover:bg-secondary-foreground/80 transition-colors duration-100"
                        >
                            <Settings className="stroke-inherit stroke-[0.75] min-w-8 w-8 h-8" />
                        </ProjectLink>
                        
                    </div>
                    {/* <div className="flex flex-col gap-3">
                        <ProjectLink
                            name="Virtual Reality"
                            setSelectedProject={setSelectedProject}
                        >
                            <div className="min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
                        </ProjectLink>
                        <ProjectLink
                            name="Apple Vision Pro"
                            setSelectedProject={setSelectedProject}
                        >
                            <div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
                        </ProjectLink>
                        <ProjectLink
                            name="Porsche"
                            setSelectedProject={setSelectedProject}
                        >
                            <div className="min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
                        </ProjectLink>
                        <ProjectLink
                            name="Secret Project"
                            setSelectedProject={setSelectedProject}
                        >
                            <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
                        </ProjectLink>
                    </div> */}
                </motion.nav>
                </div>
            </div>
            <AnimatePresence>
                {selectedProject && (
                    <ProjectNavigation
                        id="project-navigation"
                        setIsOpen={setIsOpen}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        isOpen={isOpen}
                        restaurant={restaurant.data}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
