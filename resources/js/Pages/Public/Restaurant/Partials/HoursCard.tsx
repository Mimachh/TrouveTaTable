import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { formatTime } from "@/lib/format-time";
import { cn } from "@/lib/utils";
import { FormatedDayAndHour } from "@/types/days";

interface Props {
    hours: FormatedDayAndHour[];
}
const HoursCard = (props: Props) => {

    const {hours} = props;
    return (
        <Card
            x-chunk="card-hours"
            className="bg-background h-fit w-full shadow"
        >
            <CardHeader className="px-7">
                <CardTitle className="text-lg">Horaires d'ouverture</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-0.5 text-[14px]">
                    {Object.values(hours).map((day, index) => (
                        <div className="w-full" key={day.day_id}>
                            <li className="flex items-center justify-between">
                                <span
                                    className={cn(
                                        day.isToday
                                            ? "font-semibold"
                                            : "font-normal"
                                    )}
                                >
                                    {day.day_name}
                                </span>

                                <div className="flex flex-col justify-center">
                                    {day.services.length > 0 ? (
                                        <>
                                            {day.services.map(
                                                (service, index) => (
                                                    <span
                                                        key={index}
                                                        className={cn(
                                                            day.isToday
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                            "text-[12px]"
                                                        )}
                                                    >
                                                        {formatTime(
                                                            service.start_time
                                                        )}
                                                        {" - "}
                                                        {formatTime(
                                                            service.end_time
                                                        )}
                                                    </span>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <small className="text-muted-foreground">
                                            Fermé
                                        </small>
                                    )}
                                </div>
                            </li>
                            {index < Object.values(hours).length - 1 && (
                                <Separator className="text-normal inline-block h-px my-1.5" />
                            )}
                        </div>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default HoursCard;
