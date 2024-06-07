import { MetaDataType } from "@/types/meta";
import { Button } from "./ui/button";
import { router } from "@inertiajs/react";

const Pagination = ({ meta }: { meta: MetaDataType }) => {
    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            {meta.links.map((link, index) => {
                const labelNumber = Number(link.label);
                if (isNaN(labelNumber)) {
                    // C'est soit "Previous" soit "Next"
                    return (
                        link.label === "&laquo; Previous" && (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.visit(link.url);
                                }}
                                disabled={!link.url}
                            >
                                Précédent
                            </Button>
                        )
                    );
                }
            })}
            <small>
                {meta.current_page} / {meta.last_page}
            </small>
            {meta.links.map((link, index) => {
                const labelNumber = Number(link.label);
                if (isNaN(labelNumber)) {
                    // C'est soit "Previous" soit "Next"
                    return (
                        link.label !== "&laquo; Previous" && (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    router.visit(link.url);
                                }}
                                disabled={!link.url}
                            >
                                Suivant
                            </Button>
                        )
                    );
                }
            })}
        </div>
    );
};

export default Pagination;
