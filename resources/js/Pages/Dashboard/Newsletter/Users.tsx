import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { DataNewsletterUserTables } from "./Partials/data-table";
import { getTableColumns } from "./Partials/columns";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";
import { NewsletterUser } from "@/types/newsletter-user";

type Props = PageProps & {
    users: {
        data: NewsletterUser[];
        meta: {
            links: any[];
            current_page: number;
            last_page: number;
        };
    };
    restaurant: {
        data: Restaurant;
    };
    can: {
        unsubscribe: boolean;
    };
    countUser: number
};

const Users = (props: Props) => {
    const { users, can, restaurant, countUser } = props;
    const tableColumns = getTableColumns({
        can,
        restaurant: restaurant.data,
    });

    return (
        <div>
               <h1 className="text-4xl font-semibold tracking-wide p-2">
                    Utilisateurs inscrits à la newsletter 
                            <span className="text-xl">{" "}({countUser})</span>
                </h1>
           
            <DataNewsletterUserTables
                columns={tableColumns}
                data={users.data}
                meta={users.meta}
            />
        </div>
    );
};


Users.layout = (page: React.ReactNode) => {
    return (
        <DashboardLayout
        >
            {page}
        </DashboardLayout>
    );
};

export default Users;
