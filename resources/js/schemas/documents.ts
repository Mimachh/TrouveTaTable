import { z } from "zod";


export const LineSchema = z.object({
    id: z.optional(z.coerce.number()),
    section_id: z.optional(z.coerce.number()),
    quantity: z.number().min(0),
    unit_price_ht: z.number().min(0),
    time_passed: z.optional(z.string()),
    label: z.string().min(2).max(60),
});

export const SectionSchema = z.object({
    id: z.optional(z.coerce.number()),
    name: z.string().min(2).max(60),
    document_id: z.optional(z.coerce.number()),

    lines: z.array(LineSchema),
});

export const DocumentSchema = z.object({
    id: z.optional(z.coerce.number()),
    // document_uuid: z.string(),
    document_name: z.number(),
    // document_type: z.enum(['Devis', 'Facture']),
    // document_date: z.string(),

    // professional_last_name: z.string().min(2).max(60),
    // professional_first_name: z.string().min(2).max(60),
    // professional_siret: z.string().min(14).max(14),
    // professional_mail: z.string().email(),
    // professional_street: z.string().min(2).max(60),
    // professional_city: z.string().min(2).max(60),
    // professional_zipcode: z.string().min(5).max(5),
    // professional_country: z.string().min(2).max(60),

    // client_last_name: z.string().min(2).max(60),
    // client_first_name: z.string().min(2).max(60),
    // client_mail: z.string().email(),
    // client_street: z.string().min(2).max(60),
    // client_city: z.string().min(2).max(60),
    // client_zipcode: z.string().min(5).max(5),
    // client_country: z.string().min(2).max(60),

    // total_price_ht: z.number().min(0),
    // total_price_ttc: z.number().min(0),

    // entreprise_status_id: z.coerce.number(),

    // sections: z.array(SectionSchema),
})


