
export const DocumentDataFields = (entreprise?: any | null) => {
    const datafields = {
        document_name: "",
        document_uuid: "",

        professional_last_name: entreprise?.owner_last_name || "",
        professional_first_name: entreprise?.owner_first_name || "",
        professional_siret: entreprise?.siret || "",
        professional_mail: entreprise?.email || "",
        professional_street: entreprise?.street || "",
        professional_city: entreprise?.city || "",
        professional_zipcode: entreprise?.zipcode || "",
        professional_country: entreprise?.country || "",
        professional_phone: entreprise?.phone || "",
    
    
        client_last_name: "",
        client_first_name: "",
        client_mail: "",
        client_phone: "",
        client_street: "",
        client_city: "",
        client_zipcode: "",
        client_country: "",
    
        total_price_ht: 0,
        total_price_ttc: 0,
    
        entreprise_status_id: entreprise?.entreprise_status_id || 1,
    
        document_date: null,
    
        fields: [{ name: "", value: "" }],
    }

    return {datafields}
}