import {
    AdjustmentsHorizontalIcon,
    ArrowTrendingUpIcon,
    BellAlertIcon,
    BoltIcon,
    CursorArrowRaysIcon,
    PencilIcon,
    UserGroupIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import NavigationLink from "./NavigationLink";
import { Restaurant } from "@/types/restaurant";
import { Settings } from "lucide-react";

const variants = {
    close: {
        x: -300,
        opacity: 0,
    },
    open: {
        x: 0,
        opacity: 100,
    },
};

interface Props {
    id: string;
    selectedProject: string;
    isOpen: boolean;
    setSelectedProject: (project: string | null) => void;
    restaurant: Restaurant;
    setIsOpen: (isOpen: boolean) => void;
}

const ProjectNavigation = ({
    id,
    selectedProject,
    isOpen,
    setSelectedProject,
    restaurant,
    setIsOpen,
}: Props) => {
    return (
        <>
            {selectedProject === "Utilisateurs" ? (
                <UserProjectNavigation
                    id={id}
                    selectedProject={selectedProject}
                    isOpen={isOpen}
                    setSelectedProject={setSelectedProject}
                    restaurant={restaurant}
                    setIsOpen={setIsOpen}
                />
            ) : selectedProject === "Paramètres" ? (
                <SettingsProjectNavigation
                    id={id}
                    selectedProject={selectedProject}
                    isOpen={isOpen}
                    setSelectedProject={setSelectedProject}
                    restaurant={restaurant}
                    setIsOpen={setIsOpen}
                />
            ) : (
                <DefaultProjectNavigation
                    id={id}
                    selectedProject={selectedProject}
                    isOpen={isOpen}
                    setSelectedProject={setSelectedProject}
                    restaurant={restaurant}
                    setIsOpen={setIsOpen}
                />
            )}
        </>
    );
};

export default ProjectNavigation;

const DefaultProjectNavigation = (props: Props) => {
    const { id, selectedProject, isOpen, setSelectedProject, setIsOpen } =
        props;
    return (
        <motion.nav
            variants={variants}
            initial="close"
            id={id}
            animate="open"
            exit="close"
            transition={{
                duration: 0.25,
                ease: "easeInOut",
            }}
            className={`absolute z-50 ml-0 flex h-full min-h-screen w-64 flex-col gap-8 bg-secondary ${
                isOpen ? "left-64" : "left-20"
            } border-r border-secondary-foreground/20 p-5`}
        >
            <div className="flex w-full flex-row place-items-center justify-between">
                <h1 className="text-lg tracking-wide text-secondary-foreground/80">
                    {selectedProject}
                </h1>
                <button
                    onClick={() => {
                        setSelectedProject(null);
                        setIsOpen(false);
                    }}
                >
                    <XMarkIcon className="w-8 stroke-secondary-foreground/60" />
                </button>
            </div>
            <input
                placeholder="Search"
                type="text"
                className="rounded-lg bg-background px-3 py-2 tracking-wide text-muted-foreground/80"
            />
            <div className="flex flex-col gap-3">
                <NavigationLink
                    name="Progress"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <ArrowTrendingUpIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
                <NavigationLink
                    name="Team Members"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <UserGroupIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
                <NavigationLink
                    name="In Review"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <PencilIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
                <NavigationLink
                    name="In Progress"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <BoltIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
                <NavigationLink
                    name="Up Next"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <CursorArrowRaysIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
                <NavigationLink
                    name="Project Settings"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <AdjustmentsHorizontalIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="tracking-wide text-secondary-foreground/80">
                    Team Members
                </h1>
                <a href="#" className="flex flex-row place-items-center gap-3">
                    <UserIcon className="w-8 rounded-full bg-rose-200/70 stroke-rose-800 stroke-2 p-1" />
                    <p className="tracking-wide text-secondary-foreground/60">
                        Steve Jobs
                    </p>
                </a>
                <a href="#" className="flex flex-row place-items-center gap-3">
                    <UserIcon className="w-8 rounded-full bg-emerald-200/70 stroke-emerald-800 stroke-2 p-1" />
                    <p className="tracking-wide text-secondary-foreground/60">
                        Bill Gates
                    </p>
                </a>
                <a href="#" className="flex flex-row place-items-center gap-3">
                    <UserIcon className="w-8 rounded-full bg-indigo-200/70 stroke-indigo-800 stroke-2 p-1" />
                    <p className="tracking-wide text-secondary-foreground/60">
                        Jeff Bezos
                    </p>
                </a>
            </div>
        </motion.nav>
    );
};

const UserProjectNavigation = (props: Props) => {
    const {
        id,
        selectedProject,
        isOpen,
        setSelectedProject,
        restaurant,
        setIsOpen,
    } = props;
    return (
        <motion.nav
            variants={variants}
            initial="close"
            id={id}
            animate="open"
            exit="close"
            transition={{
                duration: 0.25,
                ease: "easeInOut",
            }}
            className={`absolute z-50 ml-0 flex h-full min-h-screen w-64 flex-col gap-16 bg-secondary ${
                isOpen ? "left-64" : "left-20"
            } border-r border-secondary-foreground/20 p-5`}
        >
            <div className="flex h-fit w-full flex-row place-items-center justify-between">
                <h1 className="text-lg tracking-wide text-secondary-foreground/80">
                    {selectedProject}
                </h1>
                <button
                    onClick={() => {
                        setSelectedProject(null);
                        setIsOpen(false);
                    }}
                >
                    <XMarkIcon className="w-8 stroke-secondary-foreground/60" />
                </button>
            </div>
            <div className="flex flex-col gap-3">
                <NavigationLink
                    name="L'équipe"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <UserGroupIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>

                <NavigationLink
                    name="Clients"
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <ArrowTrendingUpIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>

                <NavigationLink
                    name="Newsletter"
                    href={route("dashboard.newsletter.index", restaurant.id)}
                    active={route().current(
                        "dashboard.newsletter.index",
                        restaurant.id,
                    )}
                >
                    <PencilIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
                <NavigationLink
                    name="Avis clients"
                    href={route("dashboard.ratings.index", restaurant.id)}
                    active={route().current(
                        "dashboard.ratings.index",
                        restaurant.id,
                    )}
                >
                    <BoltIcon className="w-8 min-w-8 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
            </div>
        </motion.nav>
    );
};

const SettingsProjectNavigation = (props: Props) => {
    const {
        id,
        selectedProject,
        isOpen,
        setSelectedProject,
        restaurant,
        setIsOpen,
    } = props;
    return (
        <motion.nav
            variants={variants}
            initial="close"
            id={id}
            animate="open"
            exit="close"
            transition={{
                duration: 0.25,
                ease: "easeInOut",
            }}
            className={`absolute z-50 ml-0 flex h-full min-h-screen w-64 flex-col gap-16 bg-secondary ${
                isOpen ? "left-64" : "left-20"
            } border-r border-secondary-foreground/20 p-5`}
        >
            <div className="flex h-fit w-full flex-row place-items-center justify-between">
                <h1 className="text-lg tracking-wide text-secondary-foreground/80">
                    {selectedProject}
                </h1>
                <button
                    onClick={() => {
                        setSelectedProject(null);
                        setIsOpen(false);
                    }}
                >
                    <XMarkIcon className="w-8 stroke-secondary-foreground/60" />
                </button>
            </div>
            <div className="flex flex-col gap-3">
                <NavigationLink
                    name="Généraux"
                    href={route("dashboard.settings.index", restaurant.id)}
                    active={route().current(
                        "dashboard.settings.index",
                        restaurant.id,
                    )}
                >
                    <Settings className="h-6 w-6 min-w-6 stroke-inherit stroke-[0.75]" />
                </NavigationLink>

                <NavigationLink
                    name="Notifications"
                    href={route(
                        "dashboard.settings.notifications.index",
                        restaurant.id,
                    )}
                    active={route().current(
                        "dashboard.settings.notifications.index",
                        restaurant.id,
                    )}
                >
                    <BellAlertIcon className="h-6 w-6 min-w-6 stroke-inherit stroke-[0.75]" />
                </NavigationLink>
            </div>
        </motion.nav>
    );
};
