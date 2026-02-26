export interface User {
    email: string;
    fullName: string;
    token: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Expense {
    id: number;
    title: string;
    amount: number;
    date: string;
    categoryName: string;
}

export interface ExpenseSummary {
    totalAmount: number;
    totalThisMonth: number;
    highestCategory: string;
    categoryBreakdown: { [key: string]: number };
}
