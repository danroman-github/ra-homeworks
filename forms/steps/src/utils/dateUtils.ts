// Конвертация YYYY-MM-DD -> DD.MM.YYYY
export const formatDisplayDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
};