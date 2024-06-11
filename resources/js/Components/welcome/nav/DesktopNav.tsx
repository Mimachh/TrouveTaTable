import {  m, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import RegisterButton from "@/Components/ui/register-button";
import { WelcomeNavProps } from "./Index";

export interface ExtendedWelcomeNavProps extends WelcomeNavProps {
    handleTabClick: (tabId: string) => void;
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

const DesktopNav = (props: ExtendedWelcomeNavProps) => {
    const { tabs, handleTabClick, activeTab, setActiveTab } = props;
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (previous && latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });



    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-115%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{
                duration: 0.35,
                ease: "easeInOut",
            }}
            className="z-50 fixed top-2 w-full"
        >
            <div className="hidden md:flex items-center justify-between bg-welcomeBackground/30 border border-welcomePrimary/70 backdrop-blur-md h-14 md:w-[700px] md:mx-auto w-full md:px-6 rounded-full">
                <div className="flex items-center md:gap-6">
                    <p>Logo</p>
                    <div className="flex items-center md:gap-4">
                        {tabs.map((tab) => (
                            <p
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={cn(
                                    activeTab === tab.id
                                        ? ""
                                        : " hover:text-green-900/50",
                                    "relative rounded-full transition px-3 py-2 text-sm font-normal text-green-850/40 outline-2 outline-welcomeBackground focus-visible:outline"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <m.span
                                        layoutId="active-pill"
                                        style={{ borderRadius: 9999 }}
                                        className="bg-welcomePrimary/70 absolute inset-0"
                                    />
                                )}
                                <span className="relative z-10 mix-blend-darken">
                                    {tab.label}
                                </span>
                            </p>
                        ))}
                    </div>
                </div>
                <RegisterButton />
            </div>
        </motion.nav>
    );
};

export default DesktopNav;
