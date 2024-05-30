import FormFieldLayout from "@/Components/layout/form-field-layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Table } from "@/types/tables";
import React from "react";

const TableInput = ({
    data,
    setData,
    errors,
    tables,
    setGoNext
}: {
    data: any;
    setData: any;
    errors: any;
    tables: Table[];
    setGoNext?: (value: boolean) => void;
}) => {
    return (
 <>
 {tables && tables.length > 0 ? (
           <FormFieldLayout
           label="Choix de la table"
           fieldName="table_id"
           error={errors.table_id}
       >
           <Select
               onValueChange={(e) => {
                   setData("table_id", e);
                   if(setGoNext) setGoNext(true);
               }}
               // defaultValue={data.table_id?.toString() ?? undefined}
               defaultValue={undefined}
           >
               <SelectTrigger>
                   <SelectValue
                       defaultValue={data.table_id?.toString()}
                       placeholder="Choisir une table"
                   />
               </SelectTrigger>
               <SelectContent id="table">
                   {tables.map((table) => (
                       <SelectItem
                           key={table.id}
                           value={table.id?.toString() || "0"}
                       >
                           {table.name} - {table.seats} place(s)
                       </SelectItem>
                   ))}
               </SelectContent>
           </Select>
       </FormFieldLayout>
 ) : (
    <small>Aucune table disponible.</small>
 )}
 </>
    );
};

export default TableInput;
