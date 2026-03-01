"use client";

import { Trash2 } from "lucide-react";
import { Expense } from "@/types";

interface ExpensesTableProps {
    expenses: Expense[];
    loading: boolean;
    onDelete: (id: number) => Promise<void>;
}

export default function ExpensesTable({ expenses, loading, onDelete }: ExpensesTableProps) {
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await onDelete(id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-300 font-mono text-sm whitespace-nowrap">
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-white font-medium">{expense.title}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
                                        {expense.categoryName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-white font-bold font-mono text-lg">{expense.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="text-slate-500 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {expenses.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No expenses found. Start adding some!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
