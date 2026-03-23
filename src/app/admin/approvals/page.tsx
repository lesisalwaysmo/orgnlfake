import { createClient } from "@/lib/supabase/server";
import { approveUser, rejectUser } from "../actions";
import { Check, X, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns"; // We might need to install date-fns, checking package.json in next steps

// Simple component for the action buttons to use server actions
// Note: In a real large app we might split this into a client component
// but for simplicity we can use form actions here or wrap in a client component.
// Let's create a Client Component for the row actions for better UX (loading states).
import { UserRowActions } from "./user-row-actions";

export default async function AdminApprovalsPage() {
    const supabase = (await createClient()) as any;

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading profiles: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight glow-blue-text w-fit">Waiting Room</h2>
                <p className="text-muted-foreground mt-2">
                    Review and approve pending user applications.
                </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="h-12 px-4 font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">User</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground">Applied</th>
                                <th className="h-12 px-4 font-medium text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No pending applications.
                                    </td>
                                </tr>
                            ) : (
                                profiles?.map((profile: any) => (
                                    <tr
                                        key={profile.id}
                                        className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-yellow-500">
                                                <Clock className="w-4 h-4" />
                                                <span className="capitalize">{profile.status}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-white">
                                                {profile.username || "No Username"}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                ID: {profile.id}
                                            </div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                                        </td>
                                        <td className="p-4 text-right">
                                            <UserRowActions userId={profile.id} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
