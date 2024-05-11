import { Table } from "./tables";

export interface Reservation {
    id: number;
    table_id: number;
    service_id: number;
    time: string;
    email: string;
    phone?: string;
    first_name: string;
    guests: number;
    last_name: string;
    reservation_date: string;
    table: Table;
    status: string;
}