import { padZero } from '../service/file/SimulationCsv';

const pad = padZero(2);

export const formatDate = (date: Date): string => {
    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};
