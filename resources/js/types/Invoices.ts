interface AutomaticTax {
    enabled: boolean;
    liability: string | null;
    status: string | null;
}

interface Issuer {
    type: string;
}

interface PaymentSettings {
    default_mandate: any; // Le type exact peut être précisé si nécessaire
    payment_method_options: any; // Le type exact peut être précisé si nécessaire
    payment_method_types: any[] | null;
}

interface StatusTransitions {
    finalized_at: number;
    marked_uncollectible_at: number | null;
    paid_at: number;
    voided_at: number | null;
}

interface SubscriptionDetails {
    metadata: any[]; // Le type exact peut être précisé si nécessaire
}

interface Lines {
    object: string;
    data: any[]; // Le type exact peut être précisé si nécessaire
    has_more: boolean;
    total_count: number;
    url: string;
}

export interface Invoice {
    account_country: string;
    account_name: string;
    account_tax_ids: any; // Le type exact peut être précisé si nécessaire
    amount_due: number;
    amount_paid: number;
    amount_remaining: number;
    amount_shipping: number;
    application: any; // Le type exact peut être précisé si nécessaire
    application_fee_amount: any; // Le type exact peut être précisé si nécessaire
    attempt_count: number;
    attempted: boolean;
    auto_advance: boolean;
    automatic_tax: AutomaticTax;
    billing_reason: string;
    charge: string;
    collection_method: string;
    created: number;
    currency: string;
    custom_fields: any; // Le type exact peut être précisé si nécessaire
    customer: string;
    customer_address: any; // Le type exact peut être précisé si nécessaire
    customer_email: string;
    customer_name: string;
    customer_phone: any; // Le type exact peut être précisé si nécessaire
    customer_shipping: any; // Le type exact peut être précisé si nécessaire
    customer_tax_exempt: string;
    customer_tax_ids: any[];
    default_payment_method: any; // Le type exact peut être précisé si nécessaire
    default_source: any; // Le type exact peut être précisé si nécessaire
    default_tax_rates: any[]; // Le type exact peut être précisé si nécessaire
    description: any; // Le type exact peut être précisé si nécessaire
    discount: any; // Le type exact peut être précisé si nécessaire
    discounts: any[]; // Le type exact peut être précisé si nécessaire
    due_date: any; // Le type exact peut être précisé si nécessaire
    effective_at: number;
    ending_balance: number;
    footer: any; // Le type exact peut être précisé si nécessaire
    from_invoice: any; // Le type exact peut être précisé si nécessaire
    hosted_invoice_url: string;
    id: string;
    invoice_pdf: string;
    issuer: Issuer;
    last_finalization_error: any; // Le type exact peut être précisé si nécessaire
    latest_revision: any; // Le type exact peut être précisé si nécessaire
    lines: Lines;
    livemode: boolean;
    metadata: any[]; // Le type exact peut être précisé si nécessaire
    next_payment_attempt: any; // Le type exact peut être précisé si nécessaire
    number: string;
    object: string;
    on_behalf_of: any; // Le type exact peut être précisé si nécessaire
    paid: boolean;
    paid_out_of_band: boolean;
    payment_intent: string;
    payment_settings: PaymentSettings;
    period_end: number;
    period_start: number;
    post_payment_credit_notes_amount: number;
    pre_payment_credit_notes_amount: number;
    quote: any; // Le type exact peut être précisé si nécessaire
    receipt_number: any; // Le type exact peut être précisé si nécessaire
    rendering: any; // Le type exact peut être précisé si nécessaire
    rendering_options: any; // Le type exact peut être précisé si nécessaire
    shipping_cost: any; // Le type exact peut être précisé si nécessaire
    shipping_details: any; // Le type exact peut être précisé si nécessaire
    starting_balance: number;
    statement_descriptor: any; // Le type exact peut être précisé si nécessaire
    status: string;
    status_transitions: StatusTransitions;
    subscription: string;
    subscription_details: SubscriptionDetails;
    subtotal: number;
    subtotal_excluding_tax: number;
    tax: any; // Le type exact peut être précisé si nécessaire
    test_clock: any; // Le type exact peut être précisé si nécessaire
    total: number;
    total_discount_amounts: any[]; // Le type exact peut être précisé si nécessaire
    total_excluding_tax: number;
    total_tax_amounts: any[]; // Le type exact peut être précisé si nécessaire
    transfer_data: any; // Le type exact peut être précisé si nécessaire
    webhooks_delivered_at: number;
}


