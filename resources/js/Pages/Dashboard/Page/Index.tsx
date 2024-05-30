import DashboardLayout from "@/Layouts/DashboardLayout";
import PageContent from "@/Pages/Public/Restaurant/Partials/PageContent";
import { PageProps } from "@/types";
import { FormatedDayAndHour } from "@/types/days";
import { Restaurant } from "@/types/restaurant";
import { LazyMotion, domAnimation } from "framer-motion";

import React from "react";
import EnablePage from "./Partials/EnablePage";
import { Avis } from "@/types/avis";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
    hours: FormatedDayAndHour[];
    can: {
        enablePage: boolean;
        updatePage: boolean;
        updateBanner: boolean;
        updateAvatar: boolean;
        updateMedia: boolean;
    };
    avis?: {
        data: Avis[] | null;
        links: any[];
        meta: any[]
    }
};

const Page = (props: Props) => {
    const { hours, restaurant, can, avis } = props;

    return (
        <LazyMotion features={domAnimation}>
            <div className="md:grid md:grid-cols-3">
                <div className="md:col-span-1 md:col-start-3">
                    {" "}
                    <EnablePage restaurant={restaurant.data} can={can} />
                </div>
            </div>
            <PageContent restaurant={restaurant.data} hours={hours} can={can} avis={avis} />
        </LazyMotion>
    );
};

Page.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
