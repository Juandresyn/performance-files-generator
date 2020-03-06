import { plusYears, plusMonths, plusDays } from "../../utils/dateOffset";

export const users = [
    {
        name: 'Farith Perez',
        nit: '46384635',
        affiliationNumber: '1111101',
        date: plusMonths(-6, plusYears(-10,new Date())),
        numberCashIns : 10
    },
    {
        name: 'Lina Marcela Reyes Mesa',
        nit: '46384633',
        affiliationNumber: '1111102',
        date: plusYears(-2,new Date()),
        numberCashIns : 15 
    },
    {
        name: 'Jeronimo Reyes Mesa',
        nit: '46384634',
        affiliationNumber: '1111103',
        date: plusYears(-15,new Date()),
        numberCashIns : 5
    },
    {
        name: 'Lina Marcela Torres',
        nit: '46383631',
        affiliationNumber: '1111104',
        date: plusDays(-1, plusMonths(-1, plusYears(-10,new Date()))),
        numberCashIns : 10
    },
    {
        name: 'Paula Natalia Diaz Prado',
        nit: '46384632',
        affiliationNumber: '1111105',
        date: plusMonths(-10,new Date()),
        numberCashIns : 5
    },
];
