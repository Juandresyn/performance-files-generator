import { plusYears, plusMonths, plusDays } from "../../utils/dateOffset";

export const users = [

    {
        name: 'ORLANDO REYES',
        nit: '9522933',
        affiliationNumber: '123456',
        date: plusMonths(-4, plusYears(-10,new Date())),
        numberCashIns : 8
    },    
];
    /*
        {
        name: 'SONIA TATIANA DIAZ REYES', *RETIREMENT
        nit: '1019059222',
        affiliationNumber: '829301000111',
        date: plusMonths(-6, plusYears(-5,new Date())),
        numberCashIns : 6
    },  
    
    
    {
        name: 'VICTOR MANUEL VILLALBA TORRES',
        nit: '1010168400',
        affiliationNumber: '112233445566',
        date: plusMonths(-2, plusYears(-10,new Date())),
        numberCashIns : 4
    },*/