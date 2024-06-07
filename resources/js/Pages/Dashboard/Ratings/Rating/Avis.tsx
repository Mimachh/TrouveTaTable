import { Separator } from "@/Components/ui/separator";
import { formatRating } from "@/lib/format-rating";
import { Avis as AvisType, ExtendedAvis } from "@/types/avis";
import { Restaurant } from "@/types/restaurant";
import { format } from "date-fns";
import { Star } from "lucide-react";

interface Props {
  rating: ExtendedAvis
}
const Avis = (props: Props) => {
    const { rating } = props;

    return (
        <div className="space-y-4">
  
                    <div>
                        <div className="flex items-center gap-1.5 font-medium">
                            {formatRating(rating.average)} <Star className="w-4 h-4 fill-primary" />
                        </div>
                        <div>
                            <p className="text-[14px]">
                                {rating.comment}
                            </p>
                            <small className="text-muted-foreground">
                                {format(new Date(rating.created_at), "dd/MM/yyyy")}
                            </small>
                        </div>

                    </div>
       
        </div>
    );
};

export default Avis;
