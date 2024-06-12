import React, { useEffect, useState, type RefObject } from "react";

interface Props {
    cursor2: { x: number; y: number };
    cardRef2: RefObject<HTMLElement>;
    mouseOnCard2: boolean;
    color: string
}
// What i add is defs
const StoreFront = ({ cursor2, cardRef2, mouseOnCard2, color }: Props) => {
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
                    id="emeraldGradient3"
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
                stroke="url(#emeraldGradient3)"
                className="fill-neutral-950/70"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z"
            ></path>
        </svg>
    );
};

export default StoreFront;
