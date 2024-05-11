import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import {
    CalendarDaysIcon,
    ChartBarIcon,
    ChartPieIcon,
    ClockIcon,
    DocumentCheckIcon,
    Square2StackIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import ProjectLink from "./ProjectLink";
import ProjectNavigation from "./ProjectNavigation";
import { usePage } from "@inertiajs/react";
import { Restaurant } from "@/types/restaurant";

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
            <div className="sticky z-10 top-0 left-0 h-full">
                <motion.nav
                    variants={containerVariants}
                    animate={containerControls}
                    initial="close"
                    className="bg-secondary border border-r flex flex-col gap-20 p-5 absolute top-0 left-0  min-h-screen shadow"
                >
                    <div className="flex flex-row w-full justify-between place-items-center ">
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
                    <div className="flex flex-col gap-3 ">
                        <NavigationLink
                            name="Dashboard"
                            href={route("dashboard", current_restaurant.id)}
                            active={route().current("dashboard", current_restaurant.id)}
                        >
                            <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>
                        <NavigationLink name="Projects">
                            <Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>
                        <NavigationLink name="Tasks">
                            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>
                        <NavigationLink name="Reporting">
                            <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                        </NavigationLink>
                        <NavigationLink name="Users">
                            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
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
                    </div>
                    <div className="flex flex-col gap-3">
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
                    </div>
                </motion.nav>
            </div>
            <AnimatePresence>
                {selectedProject && (
                    <ProjectNavigation
                        id="project-navigation"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        isOpen={isOpen}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
