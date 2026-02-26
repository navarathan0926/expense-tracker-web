import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import { ExpenseSummary } from "@/types";

export function useDashboardSummary() {
    const [summary, setSummary] = useState<ExpenseSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSummary = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<ExpenseSummary>("/expenses/summary");
            setSummary(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch summary", err);
            setError("Failed to load summary");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return {
        summary,
        loading,
        error,
        refetch: fetchSummary,
    };
}
