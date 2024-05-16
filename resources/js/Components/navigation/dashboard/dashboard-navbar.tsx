import RestaurantSwitcher from "@/Components/switcher/restaurant-switcher";
import { ModeToggle } from "../../ui/theme-toggle";
import DashboardMainNav from "./dashboard-main-nav";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/Components/ui/skeleton";
import { useRestaurantModal } from "@/hooks/useRestaurantModal";


const DashboardNavbar = () => {


  const [resto, setResto] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getRestaurants = () => {
    setLoading(true);
    axios.get(route('get.my.restaurants'))
    .then((response) => {
      // console.log(response.data);
      setResto(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const restaurantModalReset = useRestaurantModal.use.reset();
  const restaurantModalSetReset = useRestaurantModal.use.setReset();
  useEffect(() => {
    getRestaurants();

    if(restaurantModalReset) {
      setLoading(true);
      getRestaurants();
      restaurantModalSetReset(false);
    }
  }
  , [restaurantModalReset]);

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-10 mx-auto">
        {!loading ? (
          <RestaurantSwitcher items={resto} /> 
        ) : (
          <Skeleton className="w-[200px] bg-secondary h-10 rounded" />
        ) }
        <DashboardMainNav className="mx-6 md:flex hidden" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
 
export default DashboardNavbar;