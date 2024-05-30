import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    // getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import React from "react";
import { router } from "@inertiajs/react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta: {
        links: any[];
        current_page: number;
        last_page: number;
    };
}

export function DataNewsletterUserTables<TData, TValue>({
    columns,
    data,
    meta,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
            {meta.links.map((link, index) => {
                const labelNumber = Number(link.label);
                if (isNaN(labelNumber)) {
                    // C'est soit "Previous" soit "Next"
                    return (
                        link.label === "&laquo; Previous" && (
                            <Button
                            key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.visit(link.url);
                                }}
                                disabled={!link.url}
                            >
                                Précédent
                            </Button>
                        )
                    );
                }
            })}
            <small>
                {meta.current_page} / {meta.last_page}
            </small>
            {meta.links.map((link, index) => {
                const labelNumber = Number(link.label);
                if (isNaN(labelNumber)) {
                    // C'est soit "Previous" soit "Next"
                    return (
                        link.label !== "&laquo; Previous" && (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.visit(link.url);
                                }}
                                disabled={!link.url}
                            >
                                Suivant
                            </Button>
                        )
                    );
                }
            })}
            </div>


        </>
    );
}
