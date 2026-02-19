import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/supabase/server";

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
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 glow-red-shadow" />
                        <h1 className="font-bold text-lg tracking-tight">FlowApp Admin</h1>
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
