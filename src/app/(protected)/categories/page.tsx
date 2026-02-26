"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Plus, Tag } from "lucide-react";

export default function CategoriesPage() {
    const { categories, loading, createCategory } = useCategories();
    const [name, setName] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await createCategory(name);
            setName("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Categories</h2>
                <p className="text-slate-400">Organize your expenses by creating custom categories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Category */}
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl self-start">
                    <h3 className="text-xl font-bold text-white mb-6">Create New Category</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
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

                {/* Categories List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Active Categories</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                                    <Tag size={18} />
                                </div>
                                <span className="text-slate-200 font-medium">{category.name}</span>
                            </div>
                        ))}
                        {categories.length === 0 && !loading && (
                            <div className="p-8 text-center bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                                <p className="text-slate-500">No categories yet. Create your first one!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
