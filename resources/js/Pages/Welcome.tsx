import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Index from "@/Components/welcome/nav/Index";
import { HeroParallax } from "./Welcome/HeroParallax";
import { HeroHighlight, Highlight } from "@/Components/ui/hero-highlight";
import LandingCalendar from "@/Components/welcome/landing/Calendar";
import CalendarReservation from "./Dashboard/Reservation/Partials/CalendarReservation";
import { format, startOfToday } from "date-fns";
import { Calendar, Clock, User2 } from "lucide-react";
import { fr } from "date-fns/locale";

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
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-[300vh] bg-background">
                <Head title="Welcome" />

                <Index tabs={tabs} sectionRefs={sectionRefs} />
                {/* <HeroHighlight className="w-full" containerClassName="h-screen md:h-[40rem] items-start md:items-center pt-[150px] md:pt-0"> */}

                <div className="md:mt-[150px] flex md:flex-row flex-col space-y-10 md:space-y-0 items-center justify-between gap-16 md:px-16 md:w-full">
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
                        Modernisez votre restaurant avec notre outil innovant et  {" "}
                        <Highlight className="text-welcomePrimaryText">
                        complet.
                        </Highlight>
                    </motion.h1>
                  
                    <div className="w-full border border-welcomePrimary p-4 rounded-xl bg-welcomeBackground/5">
                    <HeroHighlight containerClassName="h-fit block">
                        <div className="grid grid-cols-5 gap-3">
                            <div className="col-span-2">
                   
                                <h3 className="font-semibold  text-lg mt-10">
                                    Réserver votre table
                                </h3>
                                <small className="py-3 inline-block italic">
                                    Restaurant Le Superbe
                                </small>

                                <p className="flex items-center gap-3 text-sm pb-3">
                                    <span>
                                        <Calendar className="w-5 h-5 fill-welcomeBackground/80" />
                                    </span>
                                    <span>
                                        {format(selectedDay, "dd MMMM yyyy", {
                                            locale: fr,
                                        })}
                                    </span>
                                </p>

                                <p className="flex items-center gap-3 text-sm pb-3">
                                    <span>
                                        <Clock className="w-5 h-5 fill-welcomeBackground/80" />
                                    </span>
                                    <span>
                                        {format(new Date(), "HH:mm", {
                                            locale: fr,
                                        })}
                                    </span>
                                </p>

                                <p className="flex items-center gap-3 text-sm">
                                    <span>
                                        <User2 className="w-5 h-5 fill-welcomeBackground/80" />
                                    </span>
                                    <span>
                                        3 personnes
                                    </span>
                                </p>
                            </div>
                            <div className="col-span-3">
                                <LandingCalendar
                                    today={today}
                                    selectedDay={selectedDay}
                                    setSelectedDay={setSelectedDay}
                                    containerClassNames="md:pr-0"
                                    todaySelectedClassNames="bg-welcomePrimary/60 text-gray-100 font-normal"
                                />
                            </div>
                        </div>
                        </HeroHighlight>
                    </div>
                    
                </div>
                {/* </HeroHighlight> */}

          
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
