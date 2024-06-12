import React, { RefObject, useEffect, useState } from "react";

interface Props {
    cursor2: { x: number; y: number };
    cardRef2: RefObject<HTMLElement>;
    mouseOnCard2: boolean;
    color: string
}

const Star = ({ cursor2, cardRef2, mouseOnCard2, color }: Props) => {
    const [gradientCenter2, setGradientCenter2] = useState({
        cx: "50%",
        cy: "50%",
    });

    useEffect(() => {
        if (cardRef2.current && cursor2.x !== null && cursor2.y !== null) {
            const cardRect = cardRef2.current.getBoundingClientRect();
            const cxPercentage2 = (cursor2.x / cardRect.width) * 100 - 24;
            const cyPercentage2 = (cursor2.y / cardRect.height) * 100;
            setGradientCenter2({
                cx: `${cxPercentage2}%`,
                cy: `${cyPercentage2}%`,
            });
        }
    }, [cursor2, cardRef2]);

    useEffect(() => {
        // Mettre à jour gradientCenter ici
    }, [gradientCenter2]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-56 md:h-56 w-44 h-44 duration-200 transition-all"
            strokeWidth="0.2"
            viewBox="0 0 24 24"
        >
            <defs>
                <radialGradient
                    id="emeraldGradient1"
                    gradientUnits="userSpaceOnUse"
                    r="30%"
                    cx={gradientCenter2.cx}
                    cy={gradientCenter2.cy}
                >
                    {mouseOnCard2 && <stop stopColor={color} />}
                    <stop offset={1} stopColor="#404040" />
                </radialGradient>
            </defs>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="url(#emeraldGradient1)"
                className="fill-neutral-950/70"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            ></path>
        </svg>
    );
};

export default Star;
