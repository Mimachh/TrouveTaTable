import { Restaurant } from "@/types/restaurant";
import { router } from "@inertiajs/react";
import { m } from "framer-motion";
interface Props {
    restaurant: Restaurant;
    title: string;
}
const BookingButton = (props: Props) => {
    const { restaurant, title } = props;
    return (
            <m.button
                className="px-8 py-4 rounded-lg relative
    radial-gradient
    "
                initial={
                    {
                        "--x": "100%",
                    } as any
                }
                animate={
                    {
                        "--x": "-100%",
                    } as any
                }
                whileTap={{
                    scale: 0.97,
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1,
                    type: "spring",
                    stiffness: 20,
                    damping: 15,
                    mass: 2,
                    scale: {
                        type: "spring",
                        stiffness: 10,
                        damping: 5,
                        mass: 0.1,
                    },
                }}
                onClick={() => {
                    router.visit("/book/" + restaurant.id);
                }}
            >
                <span
                    className="text-neutral-100 tracking-wide font-light
        h-full w-full block relative linear-mask
        "
                >
                    {title}
                </span>
                <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
            </m.button>
    );
};

export default BookingButton;
