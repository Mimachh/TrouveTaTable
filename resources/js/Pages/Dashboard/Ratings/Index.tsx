import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";

export interface MetaDataType {
    current_page: number;
    from: number;
    last_page: number;
    links: any[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface LinkDataType {
    active: boolean;
    label: string;
    url: null | string;

}

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    }
    ratings: {
        data: any[];
        links: LinkDataType[];
        meta: MetaDataType
    }
};

const Ratings = (props: Props) => {
    console.log(props)
    const { restaurant, ratings } = props;
  return (
    <div>
        {ratings && ratings.data.map((rating: any) => (
            <></>
        ))}
    </div>
  )
}

Ratings.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Ratings