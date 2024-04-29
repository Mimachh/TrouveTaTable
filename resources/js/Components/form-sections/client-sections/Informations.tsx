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

const ClientInformations = ({
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
                value="client-informations"
            >
                <AccordionTrigger className="data-[state=open]:pb-5  py-0">
                    <h2 className="font-bold text-md">
                        Informations sur le client
                    </h2>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 px-1">
                        <FormFieldLayout
                            label="Nom de famille"
                            fieldName="client_last_name"
                            error={errors?.client_last_name}
                        >
                            <Input
                                className={cn(
                                    errors?.client_last_name
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="client_last_name"
                                name="client_last_name"
                                placeholder="Nom de famille du client"
                                value={data.client_last_name}
                                onChange={(e) =>
                                    setData("client_last_name", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Prénom"
                            fieldName="client_first_name"
                            error={errors?.client_first_name}
                        >
                            <Input
                                className={cn(
                                    errors?.client_first_name
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                id="client_first_name"
                                name="client_first_name"
                                placeholder="Prénom du client"
                                value={data.client_first_name}
                                onChange={(e) =>
                                    setData("client_first_name", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                        <Separator className="h-[0.5px]" />
                        <FormFieldLayout
                            label="Adresse mail"
                            fieldName="client_mail"
                            error={errors?.client_mail}
                        >
                            <Input
                                className={cn(
                                    errors?.client_mail
                                        ? "border-destructive"
                                        : ""
                                )}
                                type="text"
                                placeholder="Adresse mail du client"
                                id="client_mail"
                                name="client_mail"
                                value={data.client_mail}
                                onChange={(e) =>
                                    setData("client_mail", e.target.value)
                                }
                            />
                        </FormFieldLayout>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ClientInformations;
