import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { formatTime } from "@/lib/format-time";
import { Day, FormatedDayAndHour } from "@/types/days";
import { Edit } from "lucide-react";
import React from "react";

interface Props {
    openForm: (id: number, name: string) => void;
    days: {
        data: Day[];
    };
    hours: FormatedDayAndHour[];
}
const OpeningHours = ({ openForm, days, hours }: Props) => {
    return (
        <Card
            x-chunk="dashboard-05-chunk-3"
            className="md:col-span-2 bg-accent"
        >
            <CardHeader className="px-7">
                <CardTitle>Heures d'ouvertures</CardTitle>
                <CardDescription>
                    Gérer vos jours et heures d'ouvertures.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="bg-background">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Jour de la semaine</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Créneaux d'ouverture
                            </TableHead>
                            <TableHead className="sr-only">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.values(hours).map((day) => (
                            <TableRow
                                className="bg-background"
                                key={day.day_id}
                            >
                                <TableCell>
                                    <div className="font-medium">
                                        {day.day_name}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell space-x-0.5">
                                    {day.services.length > 0 ? (
                                        <>
                                            {day.services.map(
                                                (service, index) => (
                                                    <Badge
                                                        key={index}
                                                        className="text-xs"
                                                        variant="secondary"
                                                    >
                                                        {formatTime(
                                                            service.start_time
                                                        )}
                                                        {"/"}
                                                        {formatTime(
                                                            service.end_time
                                                        )}
                                                    </Badge>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <p>Fermé</p>
                                    )}
                                </TableCell>
                                <TableCell className="table-cell text-right">
                                    <Button
                                        onClick={() =>
                                            openForm(day.day_id, day.day_name)
                                        }
                                        variant={"ghost"}
                                        size={"sm"}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default OpeningHours;
