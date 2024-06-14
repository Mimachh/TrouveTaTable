import React, { forwardRef } from "react";
import CalendarCard from "./CalendarCard";
import Text from "./Text";

const LandingHeader = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div 
        id="Home"
        ref={ref} {...props}
        className="max-w-[1480px] lg:max-h-[600px] mx-auto min-h-screen px-2 flex lg:flex-row flex-col space-y-10 md:space-y-0 items-center md:justify-between justify-center  md:px-8 lg:px-16 md:w-full">
            <Text />
            <CalendarCard />
        </div>
    );
});

export default LandingHeader;
