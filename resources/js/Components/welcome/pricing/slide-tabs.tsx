import { FC, useEffect, useRef, useState } from "react";
import { Frequency } from "./starter-price";
import { m } from "framer-motion";
interface SlideTabsProps {
    activeFrequency: Frequency;
    setActiveFrequency: (frequency: Frequency) => void;
    frequencies: Frequency[];
}

interface Position {
    left: number;
    width: number;
    opacity: number;
}

const SlideTabs: FC<SlideTabsProps> = ({ activeFrequency, setActiveFrequency, frequencies }) => {
    const [position, setPosition] = useState<Position>({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <ul className="cursor-pointer bg-white/5 rounded-full p-1 text-center text-xs font-semibold leading-5 text-muted">
            <div className="relative grid grid-cols-2 gap-x-1">
                {frequencies.map((option) => (
                    <Tab
                        key={option.value}
                        setPosition={setPosition}
                        isActive={activeFrequency.value === option.value}
                        onClick={() => setActiveFrequency(option)}
                    >
                        {option.label}
                    </Tab>
                ))}
                <Cursor position={position} />
            </div>
        </ul>
    );
};

export default SlideTabs;
interface TabProps {
    children: React.ReactNode;
    setPosition: (position: Position) => void;
    isActive: boolean;
    onClick: () => void;
}

const Tab: FC<TabProps> = ({ children, setPosition, isActive, onClick }) => {
    const ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (isActive && ref.current) {
            const { width } = ref.current.getBoundingClientRect();
            setPosition({
                left: ref.current.offsetLeft,
                width,
                opacity: 1,
            });
        }
    }, [isActive, setPosition]);

    return (
        <li
            ref={ref}
            onClick={onClick}
            className={`relative cursor-pointer rounded-full px-2.5 py-1 text-white`}
        >
            <span className="relative mix-blend-exclusion">
                {children}
            </span>
        </li>
    );
};

interface CursorProps {
    position: Position;
}

const Cursor: FC<CursorProps> = ({ position }) => {
    return (
        <m.li
            animate={{
                ...position,
            }}
            style={{ borderRadius: 9999 }}
            transition={{
                ease: "easeInOut",
            }}
            className="bg-welcomeBackground z-[-1] absolute inset-0"
        />
    );
};