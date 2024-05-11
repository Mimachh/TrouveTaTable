export function formatDateToIsoMidDay({ date }: { date: any }) {
    const d = date as unknown as Date;
    let date2 = new Date(d);
    date2.setHours(12);
    return date2.toISOString();
}
