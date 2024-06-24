import RegisterButton from "@/Components/ui/register-button";
import { AnimatePresence, MotionConfig, motion, useCycle } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExtendedWelcomeNavProps } from "./DesktopNav";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import GoProfileButton from "@/Components/ui/go-profile-button";

const MobileNav = (props: ExtendedWelcomeNavProps) => {
    const { tabs, sectionRefs, setActiveTab, activeTab, handleTabClick } =
        props;
    const user = useUser.use.user();
    const [mobileNav, toggleMobileNav] = useCycle(false, true);
    const buttonTransitionDuration = 0.5; // En seconde

    useEffect(() => {
        if (mobileNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [mobileNav]);

    return (
        <>
            <div className="md:hidden z-[500] absolute top-2 w-full">
                <div className="flex justify-end pr-4">
                    <div className="flex items-center gap-2">
                        <AnimatePresence>
                            {!mobileNav && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: buttonTransitionDuration,
                                    }}
                                >
                                    {!user ? (
                                        <RegisterButton />
                                    ) : (
                                        <GoProfileButton />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div
                            className={cn(
                                "rounded-full h-14 w-full transition-colors duration-1000",
                                mobileNav
                                    ? "bg-welcomePrimary"
                                    : "bg-welcomeBackground/50"
                            )}
                        >
                            <motion.button
                                type="button"
                                animate={mobileNav ? "open" : "closed"}
                                onClick={() => toggleMobileNav()}
                                className="flex flex-col space-y-1 px-4 w-full h-full justify-center rounded-full"
                            >
                                <motion.span
                                    variants={{
                                        closed: { rotate: 0, y: 0 },
                                        open: { rotate: 45, y: 5 },
                                    }}
                                    className={cn(
                                        "w-6 h-[1px]  block cursor-pointor",
                                        !mobileNav ? "bg-black" : "bg-green-200"
                                    )}
                                />
                                <motion.span
                                    variants={{
                                        closed: { opacity: 1 },
                                        open: { opacity: 0 },
                                    }}
                                    className={cn(
                                        "w-6 h-[1px]  block",
                                        !mobileNav ? "bg-black" : "bg-green-200"
                                    )}
                                />
                                <motion.span
                                    variants={{
                                        closed: { rotate: 0, y: 0 },
                                        open: { rotate: -45, y: -5 },
                                    }}
                                    className={cn(
                                        "w-6 h-[1px]  block",
                                        !mobileNav ? "bg-black" : "bg-green-200"
                                    )}
                                />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {mobileNav && (
                    <MotionConfig
                        transition={{
                            type: "spring",
                            bounce: 0.1,
                        }}
                    >
                        <motion.div
                            key="mobile-nav"
                            variants={{
                                hide: {
                                    x: "-100%",
                                    transition: {
                                        type: "spring",
                                        bounce: 0.1,
                                        when: "afterChildren",
                                        staggerChildren: 0.25,
                                    },
                                },
                                show: {
                                    x: "0%",
                                    transition: {
                                        type: "spring",
                                        bounce: 0.1,
                                        when: "beforeChildren",
                                        staggerChildren: 0.25,
                                    },
                                },
                            }}
                            initial="hide"
                            animate="show"
                            exit="hide"
                            className="z-[51] fixed inset-0 bg-welcomeBackground p-6 flex flex-col justify-center space-y-10 lg:hidden"
                        >
                            <motion.ul
                                variants={{
                                    hide: {
                                        y: "25%",
                                        opacity: 0,
                                    },
                                    show: {
                                        y: "0%",
                                        opacity: 1,
                                    },
                                }}
                                className="list-none space-y-6"
                            >
                                {tabs.map((tab, index) => (
                                    <li className="relative" key={index}>
                                        <p
                                            onClick={() => {
                                                handleTabClick(tab.id);
                                                toggleMobileNav();
                                            }}
                                            className="text-5xl rounded-full transition px-3 py-2 font-normal text-green-850/40 outline-2 outline-welcomeBackground focus-visible:outline"
                                        >
                                            {activeTab === tab.id && (
                                                <motion.span
                                                    layoutId="active-pill-mobile"
                                                    style={{
                                                        borderRadius: 9999,
                                                    }}
                                                    className="bg-welcomePrimary/70 absolute inset-0"
                                                />
                                            )}
                                            <span className="relative z-10 mix-blend-darken">
                                                {tab.label}
                                            </span>
                                        </p>
                                    </li>
                                ))}

                                <li>
                                    <a
                                        href="#"
                                        className="text-5xl font-semibold text-white"
                                    >
                                        Link #2
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-5xl font-semibold text-white"
                                    >
                                        Link #3
                                    </a>
                                </li>
                            </motion.ul>
                            <motion.div
                                variants={{
                                    hide: {
                                        y: "25%",
                                        opacity: 0,
                                    },
                                    show: {
                                        y: "0%",
                                        opacity: 1,
                                    },
                                }}
                                className="w-full h-px bg-white/30"
                            ></motion.div>
                            <motion.ul
                                variants={{
                                    hide: {
                                        y: "25%",
                                        opacity: 0,
                                    },
                                    show: {
                                        y: "0%",
                                        opacity: 1,
                                    },
                                }}
                                className="list-none flex justify-center gap-x-4"
                            >
                                <li>
                                    <div className="bg-white rounded-lg w-8 h-8"></div>
                                </li>
                                <li>
                                    <div className="bg-white rounded-lg w-8 h-8"></div>
                                </li>
                                <li>
                                    <div className="bg-white rounded-lg w-8 h-8"></div>
                                </li>
                            </motion.ul>
                        </motion.div>
                    </MotionConfig>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;
