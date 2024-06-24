import { ModeToggle } from "@/Components/ui/theme-toggle";
import UserAvatar from "../../dashboard/user-avatar";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";


const ProfileNavbar = () => {
  
   

   
    return (
        <div className="border-b">
            <div className="mx-auto flex h-16 items-center px-4 md:px-10">
                {/* <DashboardMainNav className="mx-6 hidden md:flex" /> */}
                <Button
                variant={"link"}
                onClick={() => {
                    router.visit("/dashboard");
                }}
                >Retour au tableau de bord</Button>
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserAvatar />
                </div>
            </div>
        </div>
    );
};

export default ProfileNavbar;
