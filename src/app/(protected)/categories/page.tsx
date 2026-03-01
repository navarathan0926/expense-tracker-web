"use client";

import { useCategories } from "@/hooks/useCategories";
import CreateCategoryForm from "@/components/categories/CreateCategoryForm";
import CategoryList from "@/components/categories/CategoryList";

export default function CategoriesPage() {
    const { categories, loading, createCategory } = useCategories();

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Categories</h2>
                <p className="text-slate-400">Organize your expenses by creating custom categories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CreateCategoryForm onSubmit={createCategory} />
                <CategoryList categories={categories} loading={loading} />
            </div>
        </div>
    );
}
