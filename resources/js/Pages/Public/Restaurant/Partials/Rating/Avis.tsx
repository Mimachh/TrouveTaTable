import { Separator } from "@/Components/ui/separator";
import { formatRating } from "@/lib/format-rating";
import { Avis as AvisType } from "@/types/avis";
import { Restaurant } from "@/types/restaurant";
import { format } from "date-fns";
import { Star } from "lucide-react";

interface Props {
    restaurant: Restaurant;
    avis?: {
        data: AvisType[] | null;
        links: any[];
        meta: any[];
    };
}
const Avis = (props: Props) => {
    const { restaurant, avis } = props;

    return (
        <div className="space-y-4">
            {avis &&
                avis.data &&
                avis.data.map((avis) => (
                    <div key={avis.id}>
                        <div className="flex items-center gap-1.5 font-medium">
                            {formatRating(avis.average)} <Star className="w-4 h-4 fill-neutral-900" />
                        </div>
                        <div>
                            <p className="text-[14px]">
                                {avis.comment}
                            </p>
                            <small className="text-muted-foreground">
                                {format(new Date(avis.created_at), "dd/MM/yyyy")}
                            </small>
                        </div>

                        <Separator className="my-2" />
                    </div>
                ))}
        </div>
    );
};

export default Avis;
