import RestaurantSwitcher from "@/Components/switcher/restaurant-switcher";
import { ModeToggle } from "../../ui/theme-toggle";
import DashboardMainNav from "./dashboard-main-nav";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/Components/ui/skeleton";




const DashboardNavbar = () => {

  // const restaurantsData = usePage().props.restaurants as any;
  // const restaurants = restaurantsData.data as Restaurant[];
  
  const [resto, setResto] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // here i need to use axios to get the restaurants data from the url /
  const getRestaurants = () => {
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

  useEffect(() => {
    getRestaurants();
  }
  , []);

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