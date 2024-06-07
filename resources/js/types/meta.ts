export interface MetaDataType {
    current_page: number;
    from: number;
    last_page: number;
    links: any[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface LinkDataType {
    active: boolean;
    label: string;
    url: null | string;
}