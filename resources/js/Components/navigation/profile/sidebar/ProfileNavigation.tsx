import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


import ProjectLink from "../../sidebar/ProjectLink";
import NavigationLink from "../../sidebar/NavigationLink";
import ProjectProfileNavigation from "./ProjectNavigation";
import { Icon } from "@/Components/Icon";

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

const ProfileNavigation = () => {
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

    return (
        <>
            <div className="sticky left-0 top-0 z-10 h-fit">
                <div className="min-h-screen">
                    <motion.nav
                        variants={containerVariants}
                        animate={containerControls}
                        initial="close"
                        className="absolute left-0 top-0 flex h-fit min-h-full flex-col justify-start gap-24 border border-r bg-secondary p-5 shadow"
                    >
                        <div className="flex h-full w-full flex-row place-items-center justify-between">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-700" />

                            <button
                                className="flex rounded-full p-1"
                                onClick={() => handleOpenClose()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    className="h-8 w-8 stroke-secondary-foreground/80"
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
                        <div className="flex flex-col gap-3">
                            

                            <NavigationLink
                                name="Profil"
                                href={route('profile.edit')}
                                active={route().current('profile.edit')}
                            >
                                <Icon name="user" className="w-8 min-w-8 h-8 stroke-inherit stroke-[0.75]"/>
                                 
                            </NavigationLink>

                            <NavigationLink
                                name="Abonnement"
                                href={route('billings.edit')}
                                active={route().current('billings.edit')}
                            >
                                <Icon name="credit-card" className="w-8 min-w-8 h-8 stroke-inherit stroke-[0.75]"/>
                            </NavigationLink>

                            <ProjectLink
                                name="Paramètres"
                                active={false}
                                setSelectedProject={setSelectedProject}
                                className="flex cursor-pointer place-items-center gap-3 rounded stroke-secondary-foreground/60 stroke-[0.75] p-1 text-red-600 text-secondary-foreground/60 transition-colors duration-100 hover:bg-secondary-foreground/80 hover:stroke-muted hover:text-muted"
                            >
                                <Icon name="settings" className="h-8 w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                            </ProjectLink>
                        </div>
                    </motion.nav>
                </div>
            </div>
            {/* <AnimatePresence>
                {selectedProject && (
                    <ProjectProfileNavigation
                        id="project-navigation"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        isOpen={isOpen}
                    />
                )}
            </AnimatePresence> */}
        </>
    );
};

export default ProfileNavigation;
