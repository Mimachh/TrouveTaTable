import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Calendar } from "@/Components/ui/calendar";
import React from "react";
import { fr } from "date-fns/locale";

const DateInput = ({
    data,
    setData,
    errors,
    before_today,
    reservation_date,
    disabledDays,
    setGoNext
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
                className="w-full mx-auto flex items-center flex-col"
                ref={reservation_date}
            >
                <Calendar
                    locale={fr}
                    className=" rounded-lg border"
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
                        const adjustedDisabledDays = disabledDays.map((day) =>
                            day === 7 ? 0 : day
                        );
                        // Désactiver la date si elle est avant aujourd'hui ou si le jour de la semaine est dans adjustedDisabledDays
                        return (
                            date < new Date(before_today) ||
                            adjustedDisabledDays.includes(date.getDay())
                        );
                    }}
                    initialFocus
                />
            </div>
        </FormFieldLayout>
    );
};

export default DateInput;
