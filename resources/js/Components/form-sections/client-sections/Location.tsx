import { DocumentDataFields } from "@/schemas/custom-schemas/documents";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";

const ClientLocation = ({
    setData,
    data,
    errors,
}: {
    setData: (field: keyof ReturnType<typeof DocumentDataFields>['datafields'], value: string) => void;
    data: ReturnType<typeof DocumentDataFields>['datafields'];
    errors?: Partial<Record<keyof ReturnType<typeof DocumentDataFields>['datafields'], string>>;
}) => {
    return (
        <Accordion type="single" collapsible className="w-full h-fit">
            <AccordionItem
                className="border p-4 rounded-lg mb-4 md:mb-0"
                value="client-location"
            >
                <AccordionTrigger className="data-[state=open]:pb-5  py-0">
                    <h2 className="font-bold text-md">Adresse du client</h2>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 px-1">
                        <FormFieldLayout
                            label="Rue / Lieu-dit"
                            fieldName="client_street"
                            error={errors?.client_street}
                        >
                            <Input
                                className={cn(
                                    errors?.client_street
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="client_street"
                                name="client_street"
                                placeholder="Rue ou lieu-dit"
                                value={data.client_street}
                                onChange={(e) =>
                                    setData("client_street", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />

                        <FormFieldLayout
                            label="Ville"
                            fieldName="client_city"
                            error={errors?.client_city}
                        >
                            <Input
                                className={cn(
                                    errors?.client_city
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="client_city"
                                name="client_city"
                                placeholder="Ville"
                                value={data.client_city}
                                onChange={(e) =>
                                    setData("client_city", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Code postal"
                            fieldName="client_zipcode"
                            error={errors?.client_zipcode}
                        >
                            <Input
                                className={cn(
                                    errors?.client_zipcode
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="client_zipcode"
                                name="client_zipcode"
                                placeholder="Code postal"
                                value={data.client_zipcode}
                                onChange={(e) =>
                                    setData("client_zipcode", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Pays"
                            fieldName="client_country"
                            error={errors?.client_country}
                        >
                            <Input
                                className={cn(
                                    errors?.client_country
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="client_country"
                                name="client_country"
                                placeholder="Pays"
                                value={data.client_country}
                                onChange={(e) =>
                                    setData("client_country", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ClientLocation;
