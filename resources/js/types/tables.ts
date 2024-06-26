export interface Table {
    id: number;
    name: string;
    restaurant_id: string;
    seats: number;
    status: string;
}


export interface TableStatus {
    [key: string]: string;
}