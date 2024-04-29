import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { DocumentDataFields } from "@/schemas/custom-schemas/documents";
import { cn } from "@/lib/utils";

const ProfesionnalInformations = ({
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
                value="professional-informations"
            >
                <AccordionTrigger className="data-[state=open]:pb-5  py-0">
                    <h2 className="font-bold text-md">
                        Informations sur le professionnel
                    </h2>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 px-1">
                        <FormFieldLayout
                            label="Nom de famille du professionnel"
                            fieldName="professional_last_name"
                            error={errors?.professional_last_name}
                        >
                            <Input
                                className={cn(
                                    errors?.professional_last_name
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="professional_last_name"
                                name="professional_last_name"
                                placeholder="Nom de famille du professionnel"
                                value={data.professional_last_name}
                                onChange={(e) =>
                                    setData(
                                        "professional_last_name",
                                        e.target.value
                                    )
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Prénom du professionnel"
                            fieldName="professional_first_name"
                            error={errors?.professional_first_name}
                        >
                            <Input
                                className={cn(
                                    errors?.professional_first_name
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="professional_first_name"
                                name="professional_first_name"
                                placeholder="Prénom du professionnel"
                                value={data.professional_first_name}
                                onChange={(e) =>
                                    setData(
                                        "professional_first_name",
                                        e.target.value
                                    )
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Adresse mail"
                            fieldName="professional_mail"
                            error={errors?.professional_mail}
                        >
                            <Input
                                type="text"
                                className={cn(
                                    errors?.professional_mail
                                        ? "border-destructive"
                                        : ""
                                )}
                                placeholder="Adresse mail du professionnel"
                                id="professional_mail"
                                name="professional_mail"
                                value={data.professional_mail}
                                onChange={(e) =>
                                    setData("professional_mail", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Numéro de SIRET"
                            fieldName="professional_siret"
                            error={errors?.professional_siret}
                        >
                            <Input
                                className={cn(
                                    errors?.professional_siret
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="professional_siret"
                                name="professional_siret"
                                placeholder="Numéro de SIRET du professionnel"
                                value={data.professional_siret}
                                onChange={(e) =>
                                    setData(
                                        "professional_siret",
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

export default ProfesionnalInformations;
