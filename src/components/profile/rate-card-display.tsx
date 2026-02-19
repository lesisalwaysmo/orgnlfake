"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RateCardItem {
    service: string;
    rate: string;
    description?: string;
}

interface RateCardDisplayProps {
    rateCard: RateCardItem[] | Record<string, string | number> | null;
    className?: string;
}

// Helper to normalize rate card data since it's JSONB and structure might vary
const normalizeRateCard = (data: any): RateCardItem[] => {
    if (!data) return [];
    if (Array.isArray(data)) {
        return data.map(item => ({
            service: item.service || item.title || "Service",
            rate: item.rate || item.price || "Contact for pricing",
            description: item.description || ""
        }));
    }
    // Handle key-value object format
    return Object.entries(data).map(([key, value]) => ({
        service: key,
        rate: String(value),
        description: ""
    }));
};

export function RateCardDisplay({ rateCard, className }: RateCardDisplayProps) {
    const items = normalizeRateCard(rateCard);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className={cn("w-full overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm", className)}>
            <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold tracking-tight text-white">Rate Card</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 uppercase text-xs tracking-wider text-muted-foreground">
                        <tr>
                            <th className="px-6 py-4 font-medium">Service</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium text-right">Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map((item, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {item.service}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {item.description || "—"}
                                </td>
                                <td className="px-6 py-4 font-semibold text-white text-right whitespace-nowrap">
                                    {item.rate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
