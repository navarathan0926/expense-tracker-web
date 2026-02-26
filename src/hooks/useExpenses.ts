import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { Expense } from "@/types";

export interface CreateExpenseDto {
    title: string;
    amount: number;
    date: string;
    categoryId: number;
}

export function useExpenses() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Expense[]>("/expenses");
            setExpenses(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch expenses", err);
            setError("Failed to load expenses");
        } finally {
            setLoading(false);
        }
    };

    const createExpense = async (data: CreateExpenseDto) => {
        try {
            const response = await apiClient.post<Expense>("/expenses", data);
            setExpenses([response.data, ...expenses]);
            return response.data;
        } catch (err) {
            console.error("Failed to create expense", err);
            throw err;
        }
    };

    const deleteExpense = async (id: number) => {
        try {
            await apiClient.delete(`/expenses/${id}`);
            setExpenses(expenses.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Failed to delete expense", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return {
        expenses,
        loading,
        error,
        createExpense,
        deleteExpense,
        refetch: fetchExpenses,
    };
}
