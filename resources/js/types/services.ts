export interface Services {
    day_id: number;
    start_time: string;
    end_time: string;
    id: number;
    name: string;
    start_time_with_option?: string | null;
    end_time_with_option?: string | null;
    time_to_stop_reservation?: string | null;
}