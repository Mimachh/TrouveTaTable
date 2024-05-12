import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { toast } from "sonner";
import { Table } from "@/types/tables";
import { AlertModal } from "@/Components/modales/AlertModal";
import { useUpdateTable } from "@/hooks/useUpdateTable";
import axios from "axios";
import { router } from "@inertiajs/react";

interface CellActionProps {
    data: Table;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const setTable = useUpdateTable.use.setTable();
    const setOpenForm = useUpdateTable.use.setOpenForm();
    const restaurant = useUpdateTable.use.restaurant();

    const onConfirm = async () => {
        if(!restaurant) return;
        try {
            setLoading(true);
            await axios.delete(`/dashboard/${restaurant.id}/tables/${data.id}`);
           
            toast.success("Table supprimée");
            router.reload()
        } catch (error) {
            toast.error(
                "Une erreur s'est produite lors de la suppression de la table"
            );
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
                title="Supression de la table"
                description="Êtes-vous sûr de vouloir supprimer cette table ? Cette action est irréversible."
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => {
                            setOpenForm(true);
                            setTable(data);
                        }}
                    >
                        <Edit className="w-4 h-4" />
                        Mettre à jour
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-1 cursor-pointer text-destructive focus:text-red-600"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="w-4 h-4" />
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
