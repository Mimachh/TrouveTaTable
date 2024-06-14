export const formatPriceFromCents = (price: number, withCents: boolean) => {
    if(withCents) {
        return (Number(price / 100).toFixed(2)).replace('.', ',');
    } else {
        return (Number(price / 100).toFixed(0)).replace('.', ',');
    }
}

export const formatPrice = (price: number) => {
    return (Number(price).toFixed(2)).replace('.', ',');

}
export const transformMonthPriceToYearPrice = (price: number) => {
    const newPrice = Number(price * 12);

    return formatPrice(newPrice);
}