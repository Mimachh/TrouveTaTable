import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState, RefObject } from 'react';

type DesktopNavProps = {
    tabs: { id: string, label: string }[];
    sectionRefs: RefObject<(HTMLDivElement | null)[]>;
};

const DesktopNav = ({ tabs, sectionRefs }: DesktopNavProps) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const tabId = tabs[sectionRefs.current!.indexOf(entry.target as HTMLDivElement)].id;
                    setActiveTab(tabId);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: [0.1, 0.9] // Trigger when 10% of the section is visible
        });

        sectionRefs.current!.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionRefs.current!.forEach(section => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, [sectionRefs, tabs]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        const section = sectionRefs.current![tabs.findIndex(tab => tab.id === tabId)];
        if (section) {
            const offset = 0.1 * window.innerHeight; // 10% offset from the top
            window.scrollTo({
                top: section.offsetTop - offset,
                behavior: 'auto' // Remove smooth scroll
            });
        }
    };

    return (
        <motion.nav className='z-50 sticky top-2 w-full'>
            <div className='flex items-center justify-between bg-green-300/50 backdrop-blur-md h-14 md:w-[700px] md:mx-auto w-full md:px-6 rounded-full'>
                <div className="flex items-center md:gap-6">
                    <p>Logo</p>
                    <div className="flex items-center md:gap-4">
                        {tabs.map((tab) => (
                            <p
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={cn(activeTab === tab.id ? "" : " hover:text-green-900/50", "relative rounded-full transition px-3 py-2 text-sm font-normal text-green-850/40 outline-2 outline-green-400 focus-visible:outline")}
                            >
                                {activeTab === tab.id && (
                                    <motion.span layoutId="active-pill" style={{ borderRadius: 9999 }} className="bg-green-600/70 absolute inset-0" />
                                )}
                                <span className="relative z-10 mix-blend-darken">{tab.label}</span>
                            </p>
                        ))}
                    </div>
                </div>
                <Button variant={"default"} className="px-5 rounded-full text-muted/90">Inscription</Button>
            </div>
        </motion.nav>
    );
};

export default DesktopNav;
