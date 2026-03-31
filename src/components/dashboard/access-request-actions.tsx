"use client";

import { useState } from "react";
import { approveAndGenerateLink, regenerateLink } from "@/app/actions/access";
import { Check, RotateCcw, Loader2 } from "lucide-react";

interface AccessRequestActionsProps {
    requestId: string;
    status: string;
}

export function AccessRequestActions({ requestId, status }: AccessRequestActionsProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    async function handleApprove() {
        setLoading(true);
        setResult(null);
        const res = await approveAndGenerateLink(requestId);
        setLoading(false);
        if (res.error) {
            setResult(`Error: ${res.error}`);
        } else {
            setResult("✅ Link sent");
        }
    }

    async function handleRegenerate() {
        setLoading(true);
        setResult(null);
        const res = await regenerateLink(requestId);
        setLoading(false);
        if (res.error) {
            setResult(`Error: ${res.error}`);
        } else {
            setResult("🔄 New link sent");
        }
    }

    if (result) {
        return (
            <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {result}
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {status === "PENDING" && (
                <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                    Approve & Send Link
                </button>
            )}
            {(status === "APPROVED" || status === "EXPIRED") && (
                <button
                    onClick={handleRegenerate}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                    Regenerate Link
                </button>
            )}
        </div>
    );
}
