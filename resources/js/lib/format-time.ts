export function formatTime(timeString: any) {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = parseInt(hours, 10);

    // Ajoute un 0 devant les heures si elles sont inférieures à 10
    const formattedHoursString = formattedHours < 10 ? `0${formattedHours}` : formattedHours;

    return `${formattedHoursString}h${minutes}`;
}
