import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Calendar } from "@/Components/ui/calendar";
import React from "react";
import { fr } from "date-fns/locale";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const DateInput = ({
    data,
    setData,
    errors,
    before_today,
    reservation_date,
    disabledDays,
    setGoNext,
}: {
    data: any;
    setData: any;
    errors: any;
    before_today: Date;
    reservation_date: React.RefObject<HTMLInputElement>;
    disabledDays: number[];
    setGoNext: (value: boolean) => void;
}) => {
    return (
        <FormFieldLayout
            label="Date de réservation"
            fieldName="reservation_date"
            error={errors?.reservation_date}
        >
            <div
                className="mx-auto flex w-full flex-col items-center"
                ref={reservation_date}
            >
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !data.reservation_date &&
                                    "text-muted-foreground",
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.reservation_date ? (
                                format(data.reservation_date, "PPP", {locale: fr})
                            ) : (
                                <span>Choisissez une date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            locale={fr}
                            className="rounded-lg border"
                            mode="single"
                            selected={data.reservation_date}
                            onSelect={(e) => {
                                // const d = e as Date;
                                // let date = new Date(d);
                                // date.setHours(12);

                                // let isoDate = date.toISOString();
                                setData("reservation_date", e);
                                setGoNext(true);
                            }}
                            disabled={(date) => {
                                // Ajuster les indices des jours
                                const adjustedDisabledDays = disabledDays.map(
                                    (day) => (day === 7 ? 0 : day),
                                );
                                const dateTimestamp = date.setHours(0, 0, 0, 0);
                                const beforeTodayTimestamp = new Date(
                                    before_today,
                                ).getTime();

                                // Désactiver la date si elle est avant aujourd'hui ou si le jour de la semaine est dans adjustedDisabledDays
                                return (
                                    dateTimestamp < beforeTodayTimestamp ||
                                    adjustedDisabledDays.includes(date.getDay())
                                );
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </FormFieldLayout>
    );
};

export default DateInput;
