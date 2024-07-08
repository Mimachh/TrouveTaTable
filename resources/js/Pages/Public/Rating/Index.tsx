import { PageProps } from "@/types";
import RatingForm from "./Partials/Form";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import StarButton from "@/Components/ui/star-button";
import { RatingRestaurantItem } from "@/types/rating-restaurant-item";
import SiteBanner from "@/Components/SiteBanner";

type Props = PageProps & {
    errorMessage: string | null;
    items: {
        data: RatingRestaurantItem[];
    };
    token: string;
    successMessage: string | null;
};

const Index = (props: Props) => {
    const { errorMessage, items, token, successMessage } = props;
    const [ratings, setRatings] = useState<Record<number, number>>({});
    const [comment, setComment] = useState<string | null>(null);
    const [successSection, setSuccessSection] = useState<boolean>(false);

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleRatingSubmit = async () => {
        const ratingsArray = Object.entries(ratings).map(([item_id, rate]) => ({
            item_id: parseInt(item_id), // convertir item_id en nombre
            rate: rate as number,
        }));
        data.notes = ratingsArray;
        data.comment = comment;
        post(route('rating.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessSection(true);
                router.visit('/rating?success=true')
            },
            onError: (error) => {
                setIsSubmitted(false);
                console.log(error)
            }
        });
    };

    const { data, post, processing, errors } = useForm({
        comment: null as string | null,
        token: token,
        notes: [
            { item_id: null as number | null, rate: null as number | null },
        ],
    });

    return (
        <div className="flex items-center justify-center  min-h-screen">
            <SiteBanner />
            <div className="max-w-4xl bg-white mx-auto w-full border rounded-md shadow-sm">
                {errorMessage ? (
                    <div
                        className="
                        flex flex-col place-items-center
                        bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <strong className="font-bold">Erreur!</strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                ): (
                    <>
                    {successMessage ? (
                        <div className="py-6">
                            <h1 className="text-xl tracking-tighter font-semibold text-center mb-5">
                                {successMessage}
                            </h1>
                        </div>
                    ) : (
                        <div className="py-6 relative">
                        <h1 className="text-3xl tracking-tighter font-bold text-center mb-5">
                            Notez votre visite au restaurant !
                        </h1>
                        <RatingForm
                            items={items.data}
                            ratings={ratings}
                            setRatings={setRatings}
                            comment={comment}
                            setComment={setComment}
                        />

                        <StarButton
                            className="border-[1px] border-neutral-800 text-neutral-800 rounded-md text-base px-6 py-1.5
                        hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-200 ease-in-out
                        "
                            disabled={processing}
                            countOfStars={12}
                            starClasses="fill-yellow-400"
                            onClick={handleRatingSubmit}
                            type="button"
                            isSubmitted={isSubmitted}
                            setIsSubmitted={setIsSubmitted}
                            buttonText="Valider"
                        />
                    </div>
                    )}
                    </>
                   
                )}
            </div>
        </div>
    );
};

export default Index;
