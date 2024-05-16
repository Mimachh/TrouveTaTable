import { TimeField } from "@/Components/TimePicker/time-field";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Services } from "@/types/services";

const TimeAndGuestSelector = ({
    data,
    setData,
    errors,
    services,
    loading,
    timeState,
    transformedServices,
}: {
    data: any;
    setData: any;
    errors: any;
    services: Services[];
    loading: boolean;
    timeState: any;
    transformedServices: Services[];
}) => {


    return (
        <div>
            {!loading ? (
                <>
                    {transformedServices && transformedServices.length > 0 ? (
                        <>
                            <div className="border p-2 rounded-lg">
                                <Label className="text-md">
                                    {" "}
                                    Heures de service
                                </Label>
                                <div className="mt-4 flex items-center">
                                    {transformedServices.map((service) => {
                                        const startTime =
                                            service.start_time_with_option
                                                ? service.start_time_with_option
                                                      .split(":")
                                                      .slice(0, 2)
                                                      .join("h")
                                                : service.start_time
                                                      .split(":")
                                                      .slice(0, 2)
                                                      .join("h");
                                        const endTime =
                                            service.end_time_with_option
                                                ? service.end_time_with_option
                                                      .split(":")
                                                      .slice(0, 2)
                                                      .join("h")
                                                : service.end_time
                                                      .split(":")
                                                      .slice(0, 2)
                                                      .join("h");
                                        return (
                                            <div
                                                key={service.id}
                                                className="w-full grid gap-1"
                                            >
                                                <Label htmlFor="time">
                                                    {service.name}
                                                </Label>
                                                <small>
                                                    {startTime} - {endTime}
                                                </small>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <FormFieldLayout
                                fieldName="time"
                                error={errors.time}
                                label="Choisir l'heure de réservation"
                            >
                                <TimeField
                                    label="Choisir l'heure de réservation"
                                    value={timeState.timeValue ?? undefined}
                                    onChange={(value) => {
                                        timeState.setTimeValue(value);

                                        const { hour, minute } = value;
                                        const time = `${hour
                                            .toString()
                                            .padStart(2, "0")}:${minute
                                            .toString()
                                            .padStart(2, "0")}:00`;
                                        setData("time", time);
                                    }}
                                />
                            </FormFieldLayout>
                            <FormFieldLayout
                                fieldName="guests"
                                error={errors.guests}
                                label="Combien d'invités ?"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    step={1}
                                    onChange={(e) => {
                                        setData(`guests`, e.target.value);
                                    }}
                                    value={data.guests}
                                />
                            </FormFieldLayout>
                        </>
                    ) : (
                        <small>Aucun service disponible pour le jour sélectionné</small>
                    )}
                </>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default TimeAndGuestSelector;
