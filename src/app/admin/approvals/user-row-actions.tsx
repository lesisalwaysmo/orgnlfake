"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { approveUser, rejectUser } from "../actions";
import { cn } from "@/lib/utils";

export function UserRowActions({ userId }: { userId: string }) {
    const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

    const handleApprove = async () => {
        setLoading("approve");
        await approveUser(userId);
        setLoading(null);
    };

    const handleReject = async () => {
        setLoading("reject");
        await rejectUser(userId);
        setLoading(null);
    };

    return (
        <div className="flex justify-end gap-2">
            <button
                onClick={handleReject}
                disabled={!!loading}
                className="flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                title="Reject"
            >
                {loading === "reject" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <X className="w-5 h-5" />
                )}
            </button>
            <button
                onClick={handleApprove}
                disabled={!!loading}
                className="flex items-center justify-center py-2 px-4 gap-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                title="Approve"
            >
                {loading === "approve" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Check className="w-4 h-4" />
                )}
                <span className="font-medium text-sm">Approve</span>
            </button>
        </div>
    );
}
