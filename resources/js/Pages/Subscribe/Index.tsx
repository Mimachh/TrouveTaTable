import HeaderSection from "@/Components/header-section";
import Create from "@/Components/subscribe/Create";
import PaiementLayout from "@/Layouts/PaiementLayout";
import { PageProps, Product } from "@/types";
import { Head } from "@inertiajs/react";

type SubscribeProps = PageProps & {
    product: Product;
    recurrence: string;
    price: number;
    stripeKey: string;
    products: Product[];
};

const Subscribe = (props: SubscribeProps) => {
    const { product, recurrence, price, products } = props;

    const rec = recurrence === "monthly" ? "mois" : "an";
    return (
        <PaiementLayout user={props.auth.user}>
            <Head title="Abonnement" />

            <HeaderSection header="Abonnement" />
            <div className="md:max-w-4xl md:mx-auto min-h-screen w-full flex justify-center items-center">
                <div
                    className="
             md:flex w-full gap-4"
                >
                    <div className="w-full md:w-[45%] py-4 px-3 flex items-center flex-col justify-center rounded-xl">
                        <h2 className="font-bold text-xl">
                            Votre choix
                        </h2>
                        <h2 className="font-semibold text-md">
                            {product.name}
                        </h2>
                        <p className="tracking-wide">
                            Récurrence: {price}€ /{rec}
                        </p>
                    </div>

                    <div className="md:w-[55%] rounded-xl min-h-[280px] md:min-h-[320px] bg-background/60 shadow w-full border px-6 py-4  flex  justify-center items-center">
                        <Create
                            stripeKey={props.stripeKey}
                            intent={props.intent}
                            product={product}
                            recurrence={recurrence}
                        />
                    </div>
                </div>
            </div>
        </PaiementLayout>
    );
};

export default Subscribe;
