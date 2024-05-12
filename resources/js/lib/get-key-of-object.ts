import { TableStatus } from "@/types/tables";

export const getKeyOfObject = (statusValue: string, status: TableStatus[]) => {
    // @ts-ignore
    return Object.keys(status).find((key) => status[key] === statusValue);
};