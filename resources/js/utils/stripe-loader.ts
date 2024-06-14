import { useEffect } from "react";

const StripeLoader = () => {
    useEffect(() => {
        // Vérifie si le script est déjà chargé pour éviter de le charger plusieurs fois
        if (document.querySelector(`script[src="https://js.stripe.com/v3/"]`)) {
            return;
        }

        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/";
        script.async = true;
        
        script.onload = () => {
            console.log("Stripe script loaded successfully.");
            // Vous pouvez initialiser Stripe ou appeler d'autres fonctions ici
        };
        
        script.onerror = (error) => {
            console.error("Failed to load the Stripe script.", error);
        };

        document.body.appendChild(script);

        // Nettoyage du script lors du démontage du composant
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // Ce composant ne rend rien
};

export default StripeLoader;
