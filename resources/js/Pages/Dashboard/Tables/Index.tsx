import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Restaurant } from "@/types/restaurant";
import { Table, TableStatus } from "@/types/tables";
import { useForm } from "@inertiajs/react";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTableTables } from "./Partials/data-table";
import { getTableColumns } from "./Partials/columns";
import { useUpdateTable } from "@/hooks/useUpdateTable";
import { getKeyOfObject } from "@/lib/get-key-of-object";
import { toast } from "sonner";

type DashboardTablesProps = PageProps & {
    tables: {
        data: Table[];
    };
    status: TableStatus[];
    restaurant: {
        data: Restaurant;
    };
};

const Tables = ({ auth, tables, status, restaurant }: DashboardTablesProps) => {
    const updateTable = useUpdateTable.use.table();
    const open = useUpdateTable.use.openForm();
    const setOpen = useUpdateTable.use.setOpenForm();
    const setTable = useUpdateTable.use.setTable();
    const setRestaurant = useUpdateTable.use.setRestaurant();
    const tableColumns = getTableColumns();



    const { data, setData, post, processing, errors, reset } = useForm({
        id: undefined,
        name: "",
        seats: undefined,
        status: "",
    });

   
    const [statusKeyReload, setStatusKeyReload] = useState<
        string | undefined | number | null
    >();
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(`/dashboard/${restaurant.data.id}/tables`, {
            onSuccess: () => {
                setOpen(false);
                toast.success("Nouvelle données enregistrées !");
            },
            onError: (e: any) => {
                toast.error("Une erreur est survenue ! Veillez réessayer plus tard.");
            },
        });
    };

    useEffect(() => {
        if (updateTable) {
            const key = getKeyOfObject(updateTable.status, status);
            setStatusKeyReload(Date.now());
            setData({
                //@ts-ignore
                name: updateTable.name,
                id: updateTable.id,
                seats: updateTable.seats,
                status: key,
            });
        }
    }, [updateTable]);

    useEffect(() => {
        if (!open) {
            reset();
            setTable(null);
            setStatusKeyReload(null);
        }

        setStatusKeyReload(Date.now());
    }, [open]);

    useEffect(() => {
        setRestaurant(restaurant.data);
    }, []);

    return (
        <DashboardLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold tracking-wide p-2">
                        Tables
                    </h1>
                    <Button onClick={() => setOpen(!open)}>
                        {!open ? (
                            <>
                                <Plus className="w-6 h-6" />{" "}
                                <span className="hidden md:flex">
                                    &nbsp; Ajouter une table
                                </span>
                            </>
                        ) : (
                            <>
                                <Minus className="w-6 h-6" />
                                <span className="hidden md:flex">
                                    &nbsp; Annuler
                                </span>
                            </>
                        )}
                    </Button>
                </div>
            }
        >
            {open && (
                <form
                    onSubmit={submit}
                    className=" border p-6 rounded-xl flex flex-col justify-start gap-5"
                >
                    <div className="flex items-center gap-2">
                        <FormFieldLayout
                            className="flex-1 min-w-fit"
                            label="Nom de la table"
                            fieldName="name"
                            error={errors.name}
                        >
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full py-3 border"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <FormFieldLayout
                            className="flex-1 min-w-fit"
                            label="Nombre de places"
                            fieldName="seats"
                            error={errors.seats}
                        >
                            <Input
                                id="seats"
                                type="number"
                                min={1}
                                step={1}
                                name="seats"
                                value={data.seats ?? ""}
                                className="mt-1 block w-full py-3 border"
                                onChange={(e) =>
                                    //@ts-ignore
                                    setData("seats", parseInt(e.target.value))
                                }
                            />
                        </FormFieldLayout>
                        <FormFieldLayout
                            className="flex-1 min-w-fit"
                            label="Status"
                            fieldName="status"
                            error={errors.status}
                        >
                            <Select
                                key={statusKeyReload}
                                onValueChange={(e) => {
                                    setData("status", e);
                                }}
                                defaultValue={data.status}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir un status" />
                                </SelectTrigger>
                                <SelectContent id="status">
                                    {Object.keys(status).map((key) => (
                                        <SelectItem key={key} value={key}>
                                            {/* @ts-ignore */}
                                            {status[key]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormFieldLayout>
                    </div>

                    <div className="flex items-center gap-3 justify-center">
                        <Button
                            onClick={() => setOpen(false)}
                            variant={"secondary"}
                            type="button"
                        >
                            Annuler
                        </Button>
                        <Button type="submit" variant={"default"}>
                            Valider
                        </Button>
                    </div>
                </form>
            )}
            <DataTableTables columns={tableColumns} data={tables.data} />
        </DashboardLayout>
    );
};

export default Tables;
