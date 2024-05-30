import RestaurantPageLayout from "@/Layouts/RestaurantPageLayout";
import { FormatedDayAndHour } from "@/types/days";
import { Restaurant } from "@/types/restaurant";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

import PageContent from "./Partials/PageContent";
import { Avis } from "@/types/avis";

interface Props {
    restaurant: {
        data: Restaurant;
    };
    hours: FormatedDayAndHour[];
    avis?: {
        data: Avis[] | null;
        links: any[];
        meta: any[]
    }
}

const RestaurantPage = (props: Props) => {
    const { restaurant, hours, avis } = props;
    return (
        <div className="relative">
            <Head>
                <title>{restaurant.data.name}</title>
                <meta
                    name="descripton"
                    content={`Bienvenue au restaurant ${restaurant.data.name}.`}
                />
            </Head>

            <PageContent restaurant={restaurant.data} hours={hours} avis={avis} />
        </div>
    );
};

RestaurantPage.layout = (page: React.ReactNode) => {
    return <RestaurantPageLayout>{page}</RestaurantPageLayout>;
};

export default RestaurantPage;
