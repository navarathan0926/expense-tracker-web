"use client";

import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";

export default function DashboardPage() {
    const { summary, loading } = useDashboardSummary();

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
                <p className="text-slate-400">Welcome back to your financial summary.</p>
            </div>

            <SummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CategoryBreakdown summary={summary} />
            </div>
        </div>
    );
}
