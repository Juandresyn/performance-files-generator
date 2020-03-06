export const plusYears = (years: number, date: Date) => {
    const modifiedDate = new Date(date);
    modifiedDate.setFullYear(modifiedDate.getFullYear() + years);
    return modifiedDate;
};

export const plusMonths = (months: number, date: Date) => {
    const modifiedDate = new Date(date);
    modifiedDate.setMonth(modifiedDate.getMonth() + months);
    return modifiedDate;
};

export const plusDays = (days: number, date: Date) => {
    const modifiedDate = new Date(date);
    modifiedDate.setDate(modifiedDate.getDate() + days);
    return modifiedDate;
};
