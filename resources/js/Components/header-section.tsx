import React from "react";
import { Trait } from "./svg";

const HeaderSection = ({ header }: { header: React.ReactNode }) => {
    return (
        <header className="bg-white shadow">
            <div className="
            max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="w-fit relative">
                {header}
                <Trait
                    className="absolute 
                    -bottom-[0px] left-0 -translate-x-[55%]
                        w-[55px] h-2 fill-primaryBlue"
                />
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;
