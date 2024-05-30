export const formatRating = (rating: number) => {
    return rating !== undefined ? rating.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "Pas encore de note";
};