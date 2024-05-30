
import { Button } from "@/Components/ui/button";


import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy } from "lucide-react";
import { CellAction } from "./cell-action";
import { NewsletterUser } from "@/types/newsletter-user";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Restaurant } from "@/types/restaurant";

interface Props {
    can: {
        unsubscribe: boolean;
    };
    restaurant: Restaurant
}
export const getTableColumns = (props: Props) => {
    const { can, restaurant } = props;
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Adresse mail copié");
    };

    const tablesColumns: ColumnDef<NewsletterUser>[] = [
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-1">
                        <p>{row.original.email}</p>
                        <span
                            onClick={() => onCopy(row.original.email)}
                            className="hover:bg-secondary transition-colors cursor-pointer md:p-2 rounded"
                        >
                            <Copy className="h-4 w-4" />
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: "subscribed_at",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Date d'inscription
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return (
                    <div>
                        {format(row.original.subscribed_at, "dd MMMM yyyy", {
                            locale: fr,
                        })}
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} can={can} restaurant={restaurant} />,
        },
    ];

    return tablesColumns;
};
