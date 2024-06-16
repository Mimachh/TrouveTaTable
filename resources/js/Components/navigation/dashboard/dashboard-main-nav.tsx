import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";
import { Restaurant } from "@/types/restaurant";
import { usePage } from "@inertiajs/react";
import { Check, ImageIcon, VideoIcon, Zap } from "lucide-react";

const getDashboardMainNav = (id: string) => {
    const routes = [
        {
            href: route("dashboard", id),
            label: "Dashboard",
            active: route().current("dashboard"),
        },
        { href: "/settings", label: "Settings" },
    ];

    return routes;
};

const DashboardMainNav = ({
    className,

    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const restaurant = usePage().props.restaurant as any;
    const currentRestaurant = restaurant.data as Restaurant;

    const routes = getDashboardMainNav(currentRestaurant.id);
    const tools = [
 
        {
          label: "Image Generation",
          icon: ImageIcon,
          href: "/image",
          bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
          color: "text-pink-700"
      },
      {
          label: "Video Generation",
          icon: VideoIcon,
          href: "/video",
          bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
          color: "text-orange-700"
      },
     
      ]
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className,
            )}
            {...props}
        >
            {/* {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active
                            ? "text-black dark:text-white"
                            : "text-muted-foreground",
                    )}
                >
                    {route.label}
                </Link>
            ))} */}

<Card className="border-0 py-2">
                <CardContent className="flex items-center py-0">
                    <Button variant="premium" className="w-full">
                        Prendre un abonnement
                        <Zap className="ml-2 h-4 w-4 fill-white" />
                       
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card key={tool.href} className="p-3 border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button  size="lg" variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </nav>
    );
};

export default DashboardMainNav;
