import React, { forwardRef } from "react";
import CalendarCard from "./CalendarCard";
import Text from "./Text";

const LandingHeader = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <>
            <div
                id="Home"
                ref={ref}
                {...props}
                className="3xl:min-h-fit relative mx-auto flex max-w-[1480px] flex-col items-center justify-center space-y-10 px-2 md:w-full md:justify-between md:space-y-0 md:px-8 lg:px-16 pb-6 md:pb-16"
            >
                <Text />
                <CalendarCard />
             
            </div>
        </>
    );
});

export default LandingHeader;
