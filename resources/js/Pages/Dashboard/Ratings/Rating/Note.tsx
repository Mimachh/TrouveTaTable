import { formatRating } from "@/lib/format-rating";
import { Avis, ExtendedAvis } from "@/types/avis";
import { Star } from "lucide-react";

interface Props {
    rating: ExtendedAvis;
}
const Note = (props: Props) => {
    const { rating } = props;

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
                        {rating.average ? formatRating(rating.average) : "0"}
                    </div>
                </div>
                <div className="col-span-4 bg-secondary text-sm tracking-tight leading-6 text-muted-foreground h-fit">
                    <ul className="p-3">
                        {rating.notes &&
                            rating.notes.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="flex items-end gap-3"
                                    >
                                        <span className="tracking-tighter">
                                            {item.item.name}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="inline-block align-text-bottom">
                                                {formatRating(item.note)}
                                            </span>
                                            <span className="mb-0.5">
                                                <Star className="w-3 h-3 fill-primary" />
                                            </span>
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Note;
