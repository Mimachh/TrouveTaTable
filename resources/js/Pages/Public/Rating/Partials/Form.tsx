import { Textarea } from "@/Components/ui/textarea";
import { cn } from "@/lib/utils";
import { RatingRestaurantItem } from "@/types/rating-restaurant-item";
import { Star } from "lucide-react";
import React, { useState } from "react";

interface Props {
    items: RatingRestaurantItem[];
    onSubmit: () => void;
    ratings: Record<number, number>;
    setRatings: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    comment: string | null;
    setComment: React.Dispatch<React.SetStateAction<string | null>>;
}
const RatingForm = (props: Props) => {
    const { items, onSubmit, ratings, setRatings, comment, setComment } = props;

    const [hoverRatings, setHoverRatings] = useState<
        Record<number, number | null>
    >({});

    const starRatings: Record<number, string> = {
        1: "Mauvais",
        2: "Moyen",
        3: "Bon",
        4: "Très bon !",
        5: "Excellent !",
    };

    const handleMouseEnter = (index: number, itemId: number) => {
        setHoverRatings((prev) => ({ ...prev, [itemId]: index }));
    };

    const handleMouseLeave = (itemId: number) => {
        setHoverRatings((prev) => ({ ...prev, [itemId]: null }));
    };

    const handleClick = (index: number, itemId: number) => {
        setRatings((prev) => ({ ...prev, [itemId]: index }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(ratings);
        // onSubmit(ratings);
    };

    const maxCharacters = 255;
    const [text, setText] = useState("");

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setText(event.target.value);
    };
    const charactersRemaining = maxCharacters - text.length;
    return (
        <>
            <div className="md:grid md:grid-cols-2 gap-8 w-full">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="
                md:my-4 my-10
                col-span-1
                flex items-center justify-center flex-col"
                    >
                        <label className="font-semibold text-lg">
                            {item.name}
                        </label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((index) => {
                                const isFilled =
                                    index <=
                                    (hoverRatings[item.id] ||
                                        ratings[item.id] ||
                                        0);
                                const isHovered =
                                    hoverRatings[item.id] &&
                                    hoverRatings[item.id]! >= index;
                                const isSelected =
                                    ratings[item.id] &&
                                    ratings[item.id] >= index;

                                const isHoverSupToIndex =
                                    hoverRatings[item.id] &&
                                    hoverRatings[item.id]! > index;
                                const isHoverEqualToIndex =
                                    hoverRatings[item.id] &&
                                    hoverRatings[item.id] === index;
                                //  const isHoverSupToSelected =
                                return (
                                    <div
                                        key={index}
                                        onMouseEnter={() =>
                                            handleMouseEnter(index, item.id)
                                        }
                                        onMouseLeave={() =>
                                            handleMouseLeave(item.id)
                                        }
                                        onClick={() =>
                                            handleClick(index, item.id)
                                        }
                                        className="p-2 cursor-pointer"
                                    >
                                        <Star
                                            color={"#FFD700"}
                                            className={cn(
                                                isHoverSupToIndex &&
                                                    "scale-[135%]",
                                                isHoverEqualToIndex &&
                                                    "scale-[175%]",
                                                // isHovered && "opacity-[100%] fill-[#FFD700]",
                                                !isHovered &&
                                                    isSelected &&
                                                    "opacity-[60%]",
                                                (isSelected || isHovered) &&
                                                    "fill-[#FFD700]",
                                                "transition-all ease-in-out duration-200 w-10 h-10"
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <p>
                            {ratings[item.id]
                                ? starRatings[ratings[item.id]]
                                : hoverRatings[item.id]
                                ? starRatings[hoverRatings[item.id]!]
                                : "\u00A0"}
                        </p>
                    </div>
                ))}
            </div>
            <div className="md:px-20 px-6">
                <label className="font-semibold text-lg">Commentaire</label>
                <div className="relative h-full w-full">
                    <Textarea
                        maxLength={maxCharacters}
                        value={text}
                        onChange={(e) => {
                            handleTextChange(e)
                            setComment(e.target.value)
                        }}
                        className="resize-none h-24"
                    />
                    <small className="absolute bottom-1 right-2 text-muted-foreground">
                    {charactersRemaining} caractère(s) restant(s)
                    </small>
                </div>
            </div>
        </>
    );
};

export default RatingForm;
