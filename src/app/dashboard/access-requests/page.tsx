import { createClient, getCurrentProfile } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Shield, ExternalLink, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { AccessRequestActions } from "@/components/dashboard/access-request-actions";

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
    PENDING: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
    APPROVED: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
    EXPIRED: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
};

export default async function ModelAccessRequestsPage() {
    const profile = await getCurrentProfile() as any;

    if (!profile || profile.status !== "active") {
        redirect("/waiting-room");
    }

    const supabase = (await createClient()) as any;

    // Fetch only requests for this model's portfolio
    const { data: requests, error } = await supabase
        .from("access_requests")
        .select("*")
        .eq("creator_username", profile.username)
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading requests: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-amber-500" />
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">VIP Access Requests</h2>
                    <p className="text-muted-foreground mt-1">
                        Review who wants to see your restricted content.
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="h-12 px-4 font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">Client</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">Category</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">Received</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No access requests yet. When VIPs request your restricted content, they'll appear here.
                                    </td>
                                </tr>
                            ) : (
                                requests?.map((req: any) => {
                                    const config = statusConfig[req.status] || statusConfig.PENDING;
                                    const StatusIcon = config.icon;
                                    return (
                                        <tr
                                            key={req.id}
                                            className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {req.status}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium text-white">{req.client_name}</div>
                                                <div className="text-xs text-muted-foreground">{req.client_email}</div>
                                                <a
                                                    href={req.client_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs text-amber-500/80 hover:text-amber-400 mt-1 transition-colors"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    View Profile
                                                </a>
                                            </td>
                                            <td className="p-4 text-muted-foreground">{req.category}</td>
                                            <td className="p-4 text-muted-foreground text-xs">
                                                {formatDistanceToNow(new Date(req.created_at), { addSuffix: true })}
                                            </td>
                                            <td className="p-4 text-right">
                                                <AccessRequestActions requestId={req.id} status={req.status} />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
