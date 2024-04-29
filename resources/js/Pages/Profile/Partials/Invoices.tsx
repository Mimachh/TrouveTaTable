import { Invoice } from "@/types/Invoices";
import { Link } from "@inertiajs/react";

type InvoiceProps = {
    invoices: Invoice[];
};
const Invoices = ({ invoices }: InvoiceProps) => {
    return (
        <div>
            <header className="mb-3">
                <h2 className="text-lg font-medium text-gray-900">
                    Mes factures
                </h2>
            </header>
            {invoices.map((invoice) => (
                <div key={invoice.id} className="flex gap-3">
                    <span>
                        {new Date(invoice.created * 1000).toLocaleDateString(
                            "fr-FR"
                        )}
                    </span>
                    <span>{(invoice.total / 100).toFixed(2)} €</span>
                    <span>
                        <a
                        className="text-primaryBlue underline"
                          href={'/user/invoice/' + invoice.id}
                        >
                            Télécharger
                        </a>
                        
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Invoices;
