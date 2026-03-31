import { formatDistanceToNow } from "date-fns";
import { Shield, ExternalLink, Clock, CheckCircle, AlertTriangle, RotateCcw } from "lucide-react";

// Mock data for preview
const mockRequests = [
    {
        id: "1",
        client_name: "Maria Rodriguez",
        client_email: "maria@fashionweekly.com",
        client_link: "https://fashionweekly.com",
        category: "Editorial Lingerie",
        creator_username: "koketso_.m_",
        status: "PENDING",
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    },
    {
        id: "2",
        client_name: "James Chen",
        client_email: "james@vogue.co.za",
        client_link: "https://instagram.com/jameschen_casting",
        category: "Swimwear Campaign",
        creator_username: "barbiie.stallion",
        status: "APPROVED",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
    {
        id: "3",
        client_name: "Sophie Laurent",
        client_email: "sophie@elitecasting.com",
        client_link: "https://elitecasting.com/portfolio",
        category: "High Fashion Editorial",
        creator_username: "gorg_fox.rsa",
        status: "EXPIRED",
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
    {
        id: "4",
        client_name: "David Nkosi",
        client_email: "d.nkosi@brandsa.co.za",
        client_link: "https://linkedin.com/in/davidnkosi",
        category: "Runway Behind-the-Scenes",
        creator_username: "momobabes21",
        status: "PENDING",
        created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 min ago
    },
    {
        id: "5",
        client_name: "Aisha Patel",
        client_email: "aisha@cosmopolitan.co.za",
        client_link: "https://cosmopolitan.co.za",
        category: "Beauty Editorial",
        creator_username: "luciazizipho",
        status: "PENDING",
        created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 min ago
    },
];

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
    PENDING: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
    APPROVED: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
    EXPIRED: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
};

export default function PreviewDashboardPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Admin Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500" style={{ boxShadow: "0 0 8px #ef4444" }} />
                            <h1 className="font-bold text-lg tracking-tight">FlowApp Admin</h1>
                        </div>
                        <nav className="hidden sm:flex items-center gap-1">
                            <span className="px-3 py-1.5 text-sm text-muted-foreground rounded-lg">
                                Approvals
                            </span>
                            <span className="px-3 py-1.5 text-sm text-white rounded-lg bg-white/10">
                                Access Requests
                            </span>
                        </nav>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        The Gatekeeper
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-amber-500" />
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white">Access Requests</h2>
                            <p className="text-muted-foreground mt-1">
                                Review and approve VIP requests for restricted content.
                            </p>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-yellow-500">3</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Pending</div>
                        </div>
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-emerald-500">1</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Approved</div>
                        </div>
                        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-red-500">1</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Expired</div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="h-12 px-4 font-medium text-muted-foreground">Status</th>
                                        <th className="h-12 px-4 font-medium text-muted-foreground">Client</th>
                                        <th className="h-12 px-4 font-medium text-muted-foreground">Creator</th>
                                        <th className="h-12 px-4 font-medium text-muted-foreground">Category</th>
                                        <th className="h-12 px-4 font-medium text-muted-foreground">Received</th>
                                        <th className="h-12 px-4 font-medium text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockRequests.map((req) => {
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
                                                <td className="p-4 text-white font-medium">@{req.creator_username}</td>
                                                <td className="p-4 text-muted-foreground">{req.category}</td>
                                                <td className="p-4 text-muted-foreground text-xs">
                                                    {formatDistanceToNow(new Date(req.created_at), { addSuffix: true })}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {req.status === "PENDING" && (
                                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Approve & Send Link
                                                            </button>
                                                        )}
                                                        {(req.status === "APPROVED" || req.status === "EXPIRED") && (
                                                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all">
                                                                <RotateCcw className="w-3 h-3" />
                                                                Regenerate Link
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
