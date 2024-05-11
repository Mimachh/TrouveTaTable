import { Restaurant } from "./restaurant";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    available_credits: number;
    subscriptions? : Subscription[];
    invoices: any[];
    isSub: boolean;
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
    slug: string;
}
export interface Subscription {
     
}

export interface FormatUserSubscription {
    id: number;
    name: string;
    price: number;
    recurrence: string;
    price_id: string;
    isOnGracePeriod?: boolean;
    ends_at?: Date
}
export interface Feature {
    id: number;
    name: string;
    description: string;
    required_credits: number;
}

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: {key: number}[];
    recurrence: [string[]];
    stripe_product_id: {key: string}[];
}

export type FlashMessage = PageProps & {
    message?: string;
    error?: string;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
