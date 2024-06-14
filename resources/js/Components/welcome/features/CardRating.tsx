import { Check, Database, StarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import Star from "./Star";

const CardRating = () => {
    const boldRef = useRef<HTMLElement>(null);
    const [cursor2, setCursor2] = useState({ x: 0, y: 0 });
    const [mouseOnCard2, setMouseOnCard2] = useState(false);

    const handleMouseMove2 = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (boldRef.current !== null) {
            const rect2 = boldRef.current.getBoundingClientRect();
            const x2 = e.clientX - rect2.left;
            const y2 = e.clientY - rect2.top;
            setCursor2({ x: x2, y: y2 });
        }
    };
    const color = "#f9a825";
    const list = [
        {
            title: "Notations et avis clients",
        },
        {
            title: "Modération et contrôle sur les avis clients",
        },
        {
            title: "Avis vérifiés",
        },
    ];
    return (
        <section
            ref={boldRef}
            onMouseEnter={() => setMouseOnCard2(true)}
            onMouseLeave={() => setMouseOnCard2(false)}
            onMouseMove={(event) => handleMouseMove2(event)}
            className="md:w-[30rem] w-full h-fit bg-neutral-800 rounded-lg border border-neutral-600
    flex flex-col md:flex-row p-8  stroke-[0.1] hover:stroke-[0.2]
    "
        >
            <div className="flex flex-col w-full md:w-3/5 justify-between">
                <div className="flex flex-col gap-5">
                    <StarIcon
                        className="w-10 h-10 rounded-lg bg-neutral-950/70  p-2 shadow-inner"
                        style={{ stroke: color }}
                    />
                    <h1 className="text-neutral-200 tracking-wide text-xl">
                        Avis client
                    </h1>
                    <p className="-mt-2 text-sm md:text-md text-neutral-500 tracking-wide">
                        Système d'avis et de notation client. Tous les avis sont vérifiés.
                    </p>
                </div>
                <div className="mt-3 flex flex-col text-neutral-200 tracking-wide text-xs md:text-sm">
                    {list.map((item, index) => (
                        <span key={index} className="flex flex-row gap-2">
                            <Check className="w-5" style={{ color: color }} />
                            <p>{item.title}</p>
                        </span>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-2/5 flex flex-col place-items-center">
                <Star
                    mouseOnCard2={mouseOnCard2}
                    cursor2={cursor2}
                    cardRef2={boldRef}
                    color={color}
                />
            </div>
        </section>
    );
};

export default CardRating;
