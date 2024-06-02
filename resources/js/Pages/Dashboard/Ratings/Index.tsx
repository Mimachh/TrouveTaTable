import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";

type Props = PageProps & {
    restaurant: {
        data: Restaurant;
    };
};

const Ratings = (props: Props) => {
  return (
    <div>Ratings</div>
  )
}

Ratings.layout = (page: React.ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Ratings