"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/Components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

import { useRestaurantModal } from "@/hooks/useRestaurantModal"
import { router, usePage } from "@inertiajs/react"
import { Restaurant } from "@/types/restaurant"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface RestaurantSwitcherProps extends PopoverTriggerProps {
  items?: Record<string, any>[] | null;
}

export default function RestaurantSwitcher({ className, items = [] }: RestaurantSwitcherProps) {

  if(!items) {
    return null
  }
 
  const restaurantModalOnOpen = useRestaurantModal.use.onOpen()


    const props = usePage().props as any;
    const restaurant = props.restaurant.data as Restaurant;
  
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentRestaurant = formattedItems.find((item) => item.value === restaurant.id);
  
  const [open, setOpen] = React.useState(false)

  const onRestaurantSelect = (restaurant: { value: string, label: string }) => {
    setOpen(false);
    router.visit(`/dashboard/${restaurant.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a restaurant"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          <p className="truncate ">{currentRestaurant?.label}</p>
          
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 relative z-50">
        <Command>
          <CommandList>
            <CommandInput placeholder="Rechercher..." />
            <CommandEmpty>Aucun restaurant trouvé.</CommandEmpty>
            <CommandGroup heading="Restaurants">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => onRestaurantSelect(item)}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentRestaurant?.value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  restaurantModalOnOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Ajouter un restaurant
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};