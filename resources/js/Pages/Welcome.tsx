import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useRef } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Index from "@/Components/welcome/nav/Index";
import { HeroParallax } from "./Welcome/HeroParallax";
import { HeroHighlight, Highlight } from "@/Components/ui/hero-highlight";

type WelcomeProps = PageProps & {
    restaurant: any;
};

export default function Welcome({ auth, restaurant }: WelcomeProps) {
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const tabs = [
        { id: "Home", label: "Home" },
        { id: "About", label: "About" },
        { id: "Services", label: "Services" },
        { id: "Contact", label: "Contact" },
    ];

    return (
        <LazyMotion features={domAnimation}>
        <div className="min-h-[300vh] bg-background">
            <Head title="Welcome" />
            
            <Index tabs={tabs} sectionRefs={sectionRefs} />
            <HeroHighlight className="w-full" containerClassName="h-screen md:h-[40rem] items-start md:items-center pt-[150px] md:pt-0">
            
                <div className="flex md:flex-row flex-col space-y-10 md:space-y-0 items-center justify-between gap-16 md:px-16 md:w-full">
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: [20, -5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 max-w-4xl leading-relaxed lg:leading-snug "
                    >
                        With insomnia, nothing&apos;s real. Everything is far
                        away. Everything is a{" "}
                        <Highlight className="text-welcomePrimaryText">
                            copy, of a copy, of a copy.
                        </Highlight>
                    </motion.h1>
                    <div className="w-full">Image ici</div>
                </div>
            </HeroHighlight>

            <HeroParallax />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div
                    id="Home"
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className="min-h-screen"
                >
                    HOME
                </div>
                <div
                    id="About"
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className="min-h-screen"
                >
                    About
                </div>
                <div
                    id="Services"
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className="min-h-screen"
                >
                    Services
                </div>
                <div
                    id="Contact"
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className="min-h-screen"
                >
                    Contact
                </div>
            </div>
        </div>
        </LazyMotion>
    );
}
