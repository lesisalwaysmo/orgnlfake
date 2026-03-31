import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Admin Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500 glow-red-shadow" />
                            <h1 className="font-bold text-lg tracking-tight">FlowApp Admin</h1>
                        </div>
                        <nav className="hidden sm:flex items-center gap-1">
                            <Link href="/admin/approvals" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                Approvals
                            </Link>
                            <Link href="/admin/access-requests" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                                Access Requests
                            </Link>
                        </nav>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        The Gatekeeper
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
