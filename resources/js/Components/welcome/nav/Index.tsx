import React, { RefObject, useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export type WelcomeNavProps = {
    tabs: { id: string; label: string }[];
    sectionRefs: RefObject<(HTMLDivElement | null)[]>
};

const Index = (props: WelcomeNavProps) => {
    const { tabs, sectionRefs } = props;
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const tabId =
                            tabs[
                                sectionRefs.current!.indexOf(
                                    entry.target as HTMLDivElement
                                )
                            ].id;
                        setActiveTab(tabId);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: [0.1, 0.9], // Trigger when 10% of the section is visible
            }
        );

        sectionRefs.current!.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionRefs.current!.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, [sectionRefs, tabs]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        const section =
            sectionRefs.current![tabs.findIndex((tab) => tab.id === tabId)];
        if (section) {
            const offset = 0.1 * window.innerHeight; // 10% offset from the top
            window.scrollTo({
                top: section.offsetTop - offset,
                behavior: "auto", // Remove smooth scroll
            });
        }
    };

    return (
        <>
            <DesktopNav tabs={tabs} sectionRefs={sectionRefs} handleTabClick={handleTabClick} activeTab={activeTab} setActiveTab={setActiveTab}  />
            <MobileNav tabs={tabs} sectionRefs={sectionRefs} handleTabClick={handleTabClick} activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
    );
};

export default Index;
