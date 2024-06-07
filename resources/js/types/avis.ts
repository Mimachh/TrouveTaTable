export interface Avis {
    average: number;
    comment: string;
    created_at: string;
    id: number;
}

export interface ExtendedAvis extends Avis {
    isValid: boolean;
    notes: {
        id: number;
        item: {
            id: number;
            name: string;
        }
        note: number;
    }[]
}