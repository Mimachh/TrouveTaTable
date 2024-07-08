import ToastProvider from "@/providers/ToastProvider";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

const Mentions = () => {
    return (
        <ToastProvider>
            <main>
                <div className="mx-auto max-w-5xl px-4 pb-20 pt-20 text-center sm:px-6 lg:px-8">
                    <div className="flex w-full items-center justify-center">
                        <Link
                            href={route("home")}
                            className="flex w-fit items-center gap-2 rounded-md border px-3 py-1.5 transition-all hover:bg-secondary/30"
                        >
                            <span>
                                <ArrowLeft className="mr-0.5 h-3 w-3" />
                            </span>
                            <span>Retour à l'accueil</span>
                        </Link>
                    </div>
                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Mentions légales
                    </h1>
                </div>
                <div className="relative mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <Identity />
                    <Host />
                    <Activity_commercial />
                    <CGV />
                </div>
            </main>
        </ToastProvider>
    );
};

export default Mentions;

const Section = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <div>{children}</div>
        </div>
    );
};
const Identity = () => {
    return (
        <Section title="Identité">
            <ul>
                <li>Nom : Karl Muller EI</li>
                <li>
                    Adresse de l'entreprise : 4 rue du Fourneau, 72220 Laigné en
                    Belin
                </li>
                <li>Mail: mimach.dev@gmail.com</li>
                <li>Téléphone: 06 79 29 68 89</li>
            </ul>
        </Section>
    );
};

const Host = () => {
    return (
        <Section title="Hébergeur">
            <ul>
                <li>Nom : Hostinger</li>
                <li>
                    Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre
                </li>
                <li>Contact: https://www.hostinger.fr/contact</li>
            </ul>
        </Section>
    );
};

const Activity_commercial = () => {
    return (
        <Section title="Activités commerciales">
            <ul>
                <li>Statut : EI</li>
                <li>Numéro de SIRET :</li>
            </ul>
        </Section>
    );
};

const CGV = () => {
    return (
        <Section title="Conditions Générales de Vente (CGV)">
            <div>
                <p>Dernière mise à jour: 05/07/2024</p>
                <ul>
                    <li>
                        {" "}
                        1. Objet Les présentes Conditions Générales de Vente
                        (CGV) régissent l'accès et l'utilisation du service SaaS
                        proposé par TrouveTaTable via le site trouvetatable.fr. 
                        En souscrivant à notre abonnement, vous
                        acceptez sans réserve les présentes conditions.
                    </li>

                    <li>
                        {" "}
                        2. Abonnement L'abonnement proposé est un abonnement
                        unique comprenant tous les services actuellement proposé par TrouveTaTable.
                    </li>

                    <li>
                        3. Tarifs L'abonnement est proposé au tarif de [montant]
                        € par mois, hors taxes (HT). [Ajoutez des informations
                        sur les éventuelles remises ou offres promotionnelles.]
                    </li>

                    <li>
                        4. Modalités de Paiement Le paiement de l'abonnement
                        s'effectue mensuellement par prélèvement automatique à
                        partir des informations de paiement fournies lors de
                        l'inscription. Les factures sont émises à chaque début
                        de mois et sont disponibles dans l'espace client.
                    </li>

                    <li>
                        5. Durée et Résiliation L'abonnement est conclu pour une
                        durée indéterminée, avec une période minimale
                        d'engagement de [nombre] mois. Vous pouvez résilier
                        votre abonnement à tout moment via votre espace client,
                        en respectant un préavis de [nombre] jours avant la fin
                        du mois en cours. En cas de résiliation, l'accès au
                        service sera maintenu jusqu'à la fin de la période de
                        facturation en cours.{" "}
                    </li>

                    <li>
                        6. Droits et Obligations de l'Utilisateur L'utilisateur
                        s'engage à utiliser le service conformément aux
                        présentes CGV et aux lois en vigueur. Toute utilisation
                        abusive ou non autorisée du service peut entraîner la
                        résiliation immédiate de l'abonnement sans
                        remboursement.
                    </li>

                    <li>
                        7. Responsabilité de [Nom de votre entreprise] [Nom de
                        votre entreprise] s'efforce de maintenir un service
                        accessible et fonctionnel. Cependant, [Nom de votre
                        entreprise] ne pourra être tenue responsable des
                        interruptions de service, des pertes de données, ou des
                        dommages résultant de l'utilisation du service.
                    </li>

                    <li>
                        8. Propriété Intellectuelle L'ensemble des contenus et
                        services fournis dans le cadre de l'abonnement reste la
                        propriété exclusive de [Nom de votre entreprise]. Toute
                        reproduction ou utilisation non autorisée de ces
                        contenus est strictement interdite.
                    </li>

                    <li>
                        9. Données Personnelles Les données personnelles
                        collectées lors de l'inscription et de l'utilisation du
                        service sont traitées conformément à notre Politique de
                        Confidentialité disponible [lien vers la Politique de
                        Confidentialité].
                    </li>

                    <li>
                        10. Modifications des CGV [Nom de votre entreprise] se
                        réserve le droit de modifier les présentes CGV à tout
                        moment. Les modifications seront notifiées aux abonnés
                        par email et prendront effet à la date indiquée dans
                        l'email. 11. Droit Applicable et Juridiction Compétente
                        Les présentes CGV sont soumises au droit français. Tout
                        litige relatif à l'exécution ou à l'interprétation des
                        présentes sera de la compétence exclusive des tribunaux
                        de [votre juridiction].
                    </li>
                </ul>
            </div>
        </Section>
    );
};
