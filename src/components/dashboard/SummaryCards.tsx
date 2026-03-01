"use client";

import { DollarSign, TrendingUp, Trophy } from "lucide-react";
import { ExpenseSummary } from "@/types";

interface SummaryCardsProps {
    summary: ExpenseSummary | null;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
    const cards = [
        {
            title: "Total Expenses",
            value: `${summary?.totalAmount.toFixed(2) || "0.00"}`,
            icon: DollarSign,
            color: "text-blue-400",
        },
        {
            title: "This Month",
            value: `${summary?.totalThisMonth.toFixed(2) || "0.00"}`,
            icon: TrendingUp,
            color: "text-emerald-400",
        },
        {
            title: "Highest Category",
            value: summary?.highestCategory || "N/A",
            icon: Trophy,
            color: "text-amber-400",
        },
    ];

    return (
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
    );
}
