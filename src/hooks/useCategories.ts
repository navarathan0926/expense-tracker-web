import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { Category } from "@/types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Category[]>("/categories");
            setCategories(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch categories", err);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (name: string) => {
        try {
            const response = await apiClient.post<Category>("/categories", { name });
            setCategories([...categories, response.data]);
            return response.data;
        } catch (err) {
            console.error("Failed to create category", err);
            throw err;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        createCategory,
        refetch: fetchCategories,
    };
}
