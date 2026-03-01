"use client";

import { Tag } from "lucide-react";
import { Category } from "@/types";

interface CategoryListProps {
    categories: Category[];
    loading: boolean;
}

export default function CategoryList({ categories, loading }: CategoryListProps) {
    return (
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
    );
}
