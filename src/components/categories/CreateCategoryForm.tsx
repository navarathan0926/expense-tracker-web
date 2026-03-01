"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface CreateCategoryFormProps {
    onSubmit: (name: string) => Promise<unknown>;
}

export default function CreateCategoryForm({ onSubmit }: CreateCategoryFormProps) {
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await onSubmit(name);
            setName("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl self-start">
            <h3 className="text-xl font-bold text-white mb-6">Create New Category</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Category Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="e.g. Health, Travel..."
                        maxLength={50}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </form>
        </div>
    );
}
