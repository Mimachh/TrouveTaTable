import { m, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import RegisterButton from "@/Components/ui/register-button";
import { WelcomeNavProps } from "./Index";
import { useUser } from "@/hooks/useUser";
import GoProfileButton from "@/Components/ui/go-profile-button";

export interface ExtendedWelcomeNavProps extends WelcomeNavProps {
    handleTabClick: (tabId: string) => void;
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

const DesktopNav = (props: ExtendedWelcomeNavProps) => {
    const { tabs, handleTabClick, activeTab, setActiveTab } = props;
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState<boolean>(false);
    const user = useUser.use.user();
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
            className="fixed top-2 z-50 w-full"
        >
            <div className="hidden h-14 w-full items-center justify-between rounded-full border border-welcomePrimary/70 bg-white/60 backdrop-blur-md md:mx-auto md:flex md:w-[770px] md:px-6">
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
                                        : "hover:text-green-900/50",
                                    "relative cursor-pointer rounded-full px-3 py-2 text-sm font-normal text-neutral-800 outline-2 outline-welcomeBackground transition focus-visible:outline",
                                )}
                            >
                                {activeTab === tab.id && (
                                    <m.span
                                        layoutId="active-pill"
                                        style={{ borderRadius: 9999 }}
                                        className="absolute inset-0 bg-welcomePrimary/70"
                                    />
                                )}
                                <span className="relative z-10 mix-blend-darken">
                                    {tab.label}
                                </span>
                            </p>
                        ))}
                    </div>
                </div>
                {!user ? <RegisterButton /> : <GoProfileButton />}
            </div>
        </motion.nav>
    );
};

export default DesktopNav;
