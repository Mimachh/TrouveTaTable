import { formatRating } from "@/lib/format-rating";
import { Restaurant } from "@/types/restaurant";
import { Star } from "lucide-react";

interface Props {
    restaurant: Restaurant;
}
const Note = (props: Props) => {
    const { restaurant } = props;
    const rating = restaurant.rating;


    return (
        <div>
            <div className="grid grid-cols-6 border rounded-md overflow-hidden">
                <div
                       style={{
                        backgroundImage:
                            "radial-gradient(200% 140% at 60% 0%, #020617 50%, hsl(var(--primary-blue)))",
                    }}
                    
                    className="bg-primary col-span-2 w-full text-primary-foreground
        flex items-center justify-center
        "
                >
                    <div className="text-2xl font-medium tracking-wide">
                        {rating.averageRating ? formatRating(rating.averageRating) :  "0"}
                    </div>
                </div>
                <div className="col-span-4 bg-secondary text-sm tracking-tight leading-6 text-muted-foreground h-fit">
                    <ul className="p-3">
                    
                    {rating.itemsRating && Object.entries(rating.itemsRating).map(([itemName, ratingData]) => (
                    <li key={itemName}
                    className="flex items-end gap-3"
                    >
                        <span className="tracking-tighter">{itemName}</span> 
                        <span className="flex items-center gap-1">
                                <span className="inline-block align-text-bottom">
                                {formatRating(ratingData.average)} 
                                </span>
                                <span className="mb-0.5">
                                    <Star className="w-3 h-3 fill-primary" />
                                </span>
                            </span>
                       
                    </li>
                ))}

                    </ul>
                    <div className="w-full text-center pb-2.5">
                    <small className="text-[12px] font-medium ">{rating.countRating} {" "} 
                    {!rating.countRating || rating.countRating < 2 ? 
                    "client a donné son avis" : "clients ont donné leur avis"
                    }</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note;
