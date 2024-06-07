import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";
import RatingCard from "./Rating/RatingCard";
import { ExtendedAvis } from "@/types/avis";
import { format } from "date-fns";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { LinkDataType, MetaDataType } from "@/types/meta";
import Pagination from "@/Components/Pagination";
import AcceptRating from "./Partials/AcceptRating";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
    ratings: {
        data: ExtendedAvis[];
        links: LinkDataType[];
        meta: MetaDataType;
    };
    can: {
        enable_rating: boolean;
    };
};

const Ratings = (props: Props) => {
    const {
        ratings,
        restaurant,
        can = {
            enable_rating: false,
        },
    } = props;
    return (
        <div className="w-full">
            <div className="mb-10">
                <h1 className="text-4xl font-semibold tracking-wide p-2">
                    Vos évaluations clients
                </h1>
            </div>

            <AcceptRating restaurant={restaurant.data} can={can}/>
            <div className="md:grid grid-cols-3 gap-2">
                {ratings &&
                    ratings.data.map((rating: any) => (
                        <div key={rating.id}>
                            <small>
                                {" "}
                                {format(
                                    new Date(rating.created_at),
                                    "dd/MM/yyyy"
                                )}{" "}
                                - {rating.email}
                            </small>
                            <RatingCard  rating={rating} />
                        </div>
                    ))}
            </div>
            {!ratings.data.length && (
                <p>Pas d'évaluation client à afficher actuellement.</p>
            )}
            <Pagination meta={ratings.meta}/>
        </div>
    );
};

Ratings.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Ratings;
