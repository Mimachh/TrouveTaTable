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

const ProfessionalLocation = ({
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
                value="professional-location"
            >
                <AccordionTrigger className="data-[state=open]:pb-5  py-0">
                    <h2 className="font-bold text-md">
                        Adresse du professionnel
                    </h2>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 px-1">
                        <FormFieldLayout
                            label="Rue / Lieu-dit"
                            fieldName="professional_street"
                            error={errors?.professional_street}
                        >
                            <Input
                                className={cn(
                                    errors?.professional_street
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="professional_street"
                                name="professional_street"
                                placeholder="Rue ou lieu-dit"
                                value={data.professional_street}
                                onChange={(e) =>
                                    setData(
                                        "professional_street",
                                        e.target.value
                                    )
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />

                        <FormFieldLayout
                            label="Ville"
                            fieldName="professional_city"
                            error={errors?.professional_city}
                        >
                            <Input
                                className={cn(
                                    errors?.professional_city
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="professional_city"
                                name="professional_city"
                                placeholder="Ville"
                                value={data.professional_city}
                                onChange={(e) =>
                                    setData("professional_city", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Code postal"
                            fieldName="professional_zipcode"
                            error={errors?.professional_zipcode}
                        >
                            <Input
                                className={cn(
                                    errors?.professional_zipcode
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="professional_zipcode"
                                name="professional_zipcode"
                                placeholder="Code postal"
                                value={data.professional_zipcode}
                                onChange={(e) =>
                                    setData(
                                        "professional_zipcode",
                                        e.target.value
                                    )
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Pays"
                            fieldName="professional_country"
                            error={errors?.professional_country}
                        >
                            <Input
                                type="text"
                                className={cn(
                                    errors?.professional_country
                                        ? "border-destructive"
                                        : ""
                                )}
                                id="professional_country"
                                name="professional_country"
                                placeholder="Pays"
                                value={data.professional_country}
                                onChange={(e) =>
                                    setData(
                                        "professional_country",
                                        e.target.value
                                    )
                                }
                            />
                        </FormFieldLayout>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ProfessionalLocation;
