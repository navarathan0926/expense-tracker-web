"use client";

import { PieChart } from "lucide-react";
import { ExpenseSummary } from "@/types";

interface CategoryBreakdownProps {
    summary: ExpenseSummary | null;
}

export default function CategoryBreakdown({ summary }: CategoryBreakdownProps) {
    return (
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
                            <span className="text-white font-mono font-bold">{amount.toFixed(2)}</span>
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
    );
}
