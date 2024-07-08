import { Link } from "@inertiajs/react";
import React from "react";

const SiteBanner = () => {
    return (
        <div className="z-[500] fixed inset-x-0 bottom-0 bg-gradient-to-t from-welcomePrimary to-welcomeBackground text-center text-sm text-green-950 shadow-inner">
            <p className="py-1.5 leading-3">
                Cette page est propulsée par{" "}
                <Link href={"/"} className="underline">
                    trouvetatable.fr
                </Link>
            </p>
        </div>
    );
};

export default SiteBanner;
