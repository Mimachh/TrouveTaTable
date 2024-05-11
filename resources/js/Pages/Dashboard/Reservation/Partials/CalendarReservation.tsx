import { Button } from "@/Components/ui/button";
import { Reservation } from "@/types/reservation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfMonth,
    startOfToday,
    startOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

interface Props {
    today: Date;
    selectedDay: Date;
    setSelectedDay: (day: Date) => void;
}
const CalendarReservation = ({today, selectedDay, setSelectedDay}: Props) => {
 
    
    let [currentMonth, setCurrentMonth] = useState(
        format(today, "MMMM-yyyy", { locale: fr })
    );
    let firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date(), {
        locale: fr,
    });

   
    let newDays = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1, locale: fr }),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1, locale: fr }),
    });

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy", { locale: fr }));
    }

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy", { locale: fr }));
    }

    // function hasReservation(day: Date) {
    //     const formattedDay = format(day, "dd-MM-yyyy", { locale: fr });
    //     const reservationsForDay = reservations.filter(reservation => reservation.reservation_date === formattedDay);
    //     return reservationsForDay.length;
    // }
 

    
    return (
        <div className="md:pr-14">
            <div className="flex items-center">
                <h2 className="flex-auto text-sm font-semibold text-muted-foreground capitalize">
                    {format(firstDayCurrentMonth, "MMMM yyyy", { locale: fr })}
                </h2>
                <Button
                    onClick={previousMonth}
                    type="button"
                    size={"sm"}
                    variant={"ghost"}
                    className="-my-1.5 flex flex-none items-center justify-center py-0.5 px-1.5 "
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </Button>
                <Button
                    onClick={nextMonth}
                    type="button"
                    size={"sm"}
                    variant={"ghost"}
                    className="-my-1.5 flex flex-none items-center justify-center py-0.5 px-1.5"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="text-muted-foreground h-5 w-5" aria-hidden="true" />
                </Button>
            </div>
            <div className="bg-secondary py-1 rounded-md mt-10 grid grid-cols-7 text-center text-xs leading-6 text-secondary-foreground">
                <div>L</div>
                <div>Ma</div>
                <div>Mer</div>
                <div>J</div>
                <div>V</div>
                <div>S</div>
                <div>D</div>
            </div>
            <div className="grid grid-cols-7 text-sm">
                {newDays.map((day, dayIdx) => (
                    <div
                        key={day.toString()}
                        className={classNames(
                            dayIdx > 6 && "",
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            "py-2"
                            
                        )}
                    > 
                        <button
                            type="button"
                            onClick={() => setSelectedDay(day)}
                            className={classNames(
                                isEqual(day, selectedDay) && "text-secondary-foreground/80",
                                !isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                    "text-primaryBlue/80",
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    isSameMonth(day, firstDayCurrentMonth) &&
                                    "text-foreground",
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    !isSameMonth(day, firstDayCurrentMonth) &&
                                    "text-muted-foreground/60",
                                isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                    "bg-primaryBlue text-white",
                                isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    "bg-secondary",
                                !isEqual(day, selectedDay) &&
                                    "hover:bg-secondary",
                                (isEqual(day, selectedDay) || isToday(day)) &&
                                    "font-semibold",
                                "mx-auto flex h-12 w-12 items-center justify-center rounded-full relative"
                            )}
                        >
                            <time
                             dateTime={format(day, "dd-MM-yyyy")}>
                                {format(day, "d", { locale: fr })}
                            </time>
                            {/* {hasReservation(day) > 0 && (
                                 <span className="w-2 h-2 rounded-full bg-destructive absolute bottom-0 left-1/2 -translate-x-1/2" />
                            )} */}
                           
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarReservation;


let colStartClasses = [
    'col-start-7',
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
]