import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Restaurant } from "@/types/restaurant";

interface Props {
    restaurant: Restaurant;
}
const MenuCard = (props: Props) => {
    const { restaurant } = props;
    return (
        <Card
            x-chunk="card-description"
            className="bg-background h-fit w-full shadow"
        >
            <CardHeader className="px-7">
                <CardTitle className="text-lg">
                    Découvrez notre carte
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-primaryBlue underline leading-6 tracking-tight">Voir</p>
            </CardContent>
        </Card>
    );
};

export default MenuCard;
