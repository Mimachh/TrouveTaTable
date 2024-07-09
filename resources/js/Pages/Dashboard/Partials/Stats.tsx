import { Icon } from "@/Components/Icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Restaurant } from "@/types/restaurant";
import { StatsProps } from "@/types/stats";
import axios from "axios";
import { Beef, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    restaurant: Restaurant
}
const Stats = (props: Props) => {
    const { restaurant } = props;
    const [stats, setStats] = useState<StatsProps>({
        reservation_percentage: 0,
        guests_percentage: 0,
        reservation_month: 0,
        guests_month: 0,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    route("dashboard.stats", { restaurant: restaurant }),
                );

                setStats(response.data.data);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [restaurant]);

    return (
        <div className="space-y-3 md:grid md:grid-cols-4 md:gap-3 md:space-y-0">
            <Card className="bg-secondary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Réservations
                    </CardTitle>
                    <Calendar className="h-6 w-6 stroke-[0.75] text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.reservation_month}
                    </div>
                    {stats?.reservation_percentage &&
                    stats?.reservation_percentage < 0 ? (
                        <p className="text-xs text-muted-foreground">
                            {" "}
                            {stats?.reservation_percentage}% par rapport au mois
                            précédent
                        </p>
                    ) : null}
                </CardContent>
            </Card>

            <Card className="bg-secondary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Couverts
                    </CardTitle>
                    <Beef
  
                        className="h-6 w-6 min-w-6  stroke-muted-foreground stroke-[0.75] text-muted-foreground"
                    />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats?.guests_month}
                    </div>
                    {stats?.guests_percentage &&
                    stats?.guests_percentage < 0 ? (
                        <p className="text-xs text-muted-foreground">
                            {stats?.guests_percentage}% from last month
                        </p>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    );
};

export default Stats;
