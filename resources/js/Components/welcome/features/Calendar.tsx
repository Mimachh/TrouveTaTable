import React, { useEffect, useState, type RefObject } from "react";

interface Props {
    cursor2: { x: number; y: number };
    cardRef2: RefObject<HTMLElement>;
    mouseOnCard2: boolean;
    color: string
}
// What i add is defs
const Calendar = ({ cursor2, cardRef2, mouseOnCard2, color }: Props) => {
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
                    id="emeraldGradient2"
                    gradientUnits="userSpaceOnUse"
                    r="30%"
                    cx={gradientCenter2.cx}
                    cy={gradientCenter2.cy}
                >
                    {mouseOnCard2 && <stop stopColor={`${color}`} />}
                    <stop offset={1} stopColor="#404040" />
                </radialGradient>
            </defs>
            <path
                stroke="url(#emeraldGradient2)"
                className="fill-neutral-950/70"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            ></path>
        </svg>
    );
};

export default Calendar;
