"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Category } from "@/types";

interface AddExpenseModalProps {
    isOpen: boolean;
    categories: Category[];
    onClose: () => void;
    onSubmit: (data: { title: string; amount: number; date: string; categoryId: number }) => Promise<void>;
}

export default function AddExpenseModal({ isOpen, categories, onClose, onSubmit }: AddExpenseModalProps) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [categoryId, setCategoryId] = useState("");

    if (!isOpen) return null;

    const resetForm = () => {
        setTitle("");
        setAmount("");
        setCategoryId("");
        setDate(new Date().toISOString().split("T")[0]);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            title,
            amount: parseFloat(amount),
            date,
            categoryId: parseInt(categoryId),
        });
        resetForm();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="bg-slate-900 w-full max-w-lg mx-4 rounded-2xl border border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white">Add New Expense</h3>
                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
                    >
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Title</label>
                            <input
                                type="text"
                                required
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="e.g. Grocery Shopping"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Category</label>
                            <select
                                required
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="">Select a category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2.5 text-slate-400 hover:text-white transition-all rounded-lg hover:bg-slate-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                        >
                            Save Expense
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
