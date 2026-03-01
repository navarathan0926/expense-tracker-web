"use client";

import { useState } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { useCategories } from "@/hooks/useCategories";
import { Plus } from "lucide-react";
import AddExpenseModal from "@/components/expenses/AddExpenseModal";
import ExpensesTable from "@/components/expenses/ExpensesTable";

export default function ExpensesPage() {
    const { expenses, loading, createExpense, deleteExpense } = useExpenses();
    const { categories } = useCategories();
    const [showModal, setShowModal] = useState(false);

    const handleAddExpense = async (data: { title: string; amount: number; date: string; categoryId: number }) => {
        try {
            await createExpense(data);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">Expenses</h2>
                    <p className="text-slate-400">Track and manage your daily spending.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
                >
                    <Plus size={20} />
                    Add Expense
                </button>
            </div>

            <AddExpenseModal
                isOpen={showModal}
                categories={categories}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddExpense}
            />

            <ExpensesTable
                expenses={expenses}
                loading={loading}
                onDelete={deleteExpense}
            />
        </div>
    );
}
