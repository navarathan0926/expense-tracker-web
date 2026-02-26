"use client";

import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import { DollarSign, TrendingUp, Trophy, PieChart } from "lucide-react";

export default function DashboardPage() {
    const { summary, loading } = useDashboardSummary();

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    const cards = [
        { title: "Total Expenses", value: `$${summary?.totalAmount.toFixed(2) || "0.00"}`, icon: DollarSign, color: "text-blue-400" },
        { title: "This Month", value: `$${summary?.totalThisMonth.toFixed(2) || "0.00"}`, icon: TrendingUp, color: "text-emerald-400" },
        { title: "Highest Category", value: summary?.highestCategory || "N/A", icon: Trophy, color: "text-amber-400" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
                <p className="text-slate-400">Welcome back to your financial summary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div key={card.title} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-slate-800 ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">{card.title}</p>
                                <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <PieChart size={20} className="text-blue-400" />
                            Category Breakdown
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {summary && Object.entries(summary.categoryBreakdown).map(([category, amount]) => (
                            <div key={category}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-300">{category}</span>
                                    <span className="text-white font-mono font-bold">${amount.toFixed(2)}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${(amount / summary.totalAmount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {(!summary || Object.keys(summary.categoryBreakdown).length === 0) && (
                            <p className="text-slate-500 text-center py-8">No data available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
