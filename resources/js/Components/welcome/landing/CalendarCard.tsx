import { m } from "framer-motion";
import LandingCalendar from "./Calendar";
import { Calendar, Clock, User2 } from "lucide-react";
import { format, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { HeroHighlight } from "@/Components/ui/hero-highlight";
import { useState } from "react";

const CalendarCard = () => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) / 20;
        const y = (clientY - (rect.top + rect.height / 2)) / 20;
        setMousePosition({ x, y });
    };

    return (
        <m.div
            initial={{
                opacity: 0,
                x: -20,
            }}
            animate={{
                opacity: 1,
                x: [-20, 5, 0],
            }}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.4, 0.0, 0.2, 1],
            }}
            className="w-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setMousePosition({ x: 0, y: 0 });
            }}
            style={{
                transform: isHovering
                    ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
                    : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                transition: "transform 0.1s ease-out",
            }}
        >
            <m.div
                style={{
                    transform: isHovering
                        ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
                        : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
                    transition: "transform 0.1s ease-out",
                }}
                className=" border-welcomePrimary/20 w-full p-1 border-2 rounded-2xl"
            >
                <div className=" border border-welcomePrimary p-4 rounded-xl bg-welcomeBackground/5">
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
                                    <span>3 personnes</span>
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
            </m.div>
        </m.div>
    );
};

export default CalendarCard;
