import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";

import { useUpdateTable } from "@/hooks/useUpdateTable";
import { cn } from "@/lib/utils";
import { Table } from "@/types/tables";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export const getTableColumns = () => {
    const setTable = useUpdateTable.use.setTable();
    const setOpen = useUpdateTable.use.setOpenForm();

    const tablesColumns: ColumnDef<Table>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nom de la table
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "seats",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nombre de places
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const { status } = row.original;

                return (
                    <Badge
                        className={cn(
                            status === "Disponible"
                                ? "bg-green-200 text-green-800"
                                : ""
                        )}
                    >
                        {status}
                    </Badge>
                );
            },
        },

        {
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} />,
        },
    ];

    return tablesColumns;
};
