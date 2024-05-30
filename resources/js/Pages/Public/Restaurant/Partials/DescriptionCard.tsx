import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Restaurant } from "@/types/restaurant";

interface Props {
    restaurant: Restaurant;
}
const DescriptionCard = (props: Props) => {
    const { restaurant } = props;
    return (
        <Card
            x-chunk="card-description"
            className="bg-background h-fit w-full shadow"
        >
            <CardHeader className="px-7">
                <CardTitle className="text-lg">
                    A propos du restaurant {restaurant.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-primary/80 leading-6 tracking-tight">{restaurant.description}</p>
            </CardContent>
        </Card>
    );
};

export default DescriptionCard;
