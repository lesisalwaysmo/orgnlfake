import Link from "next/link";
import { Search, ArrowLeft, Users } from "lucide-react";

export default function CreatorNotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="relative mb-8">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full" />

                <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                    <Search className="w-10 h-10 text-indigo-400" />
                </div>

                <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20">
                    <span className="text-red-500 text-lg font-bold leading-none">?</span>
                </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white mb-3 text-center">
                Creator Not Found
            </h2>

            <p className="text-muted-foreground text-lg text-center max-w-md mb-10 leading-relaxed">
                We couldn't find a media kit for this username. They might not have registered yet, or the username might be misspelled.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
                <Link
                    href="/talent"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold transition-all hover:bg-white/90 active:scale-[0.98]"
                >
                    <Users className="w-4 h-4" />
                    Browse Creators
                </Link>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {/* Hint for the viewer */}
            <div className="mt-16 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 max-w-sm text-center">
                <p className="text-sm text-indigo-300">
                    <span className="font-semibold text-indigo-200">Are you a creator?</span> Join us today to build your own stunning media kit and portfolio.
                </p>
                <Link href="/join" className="text-sm text-indigo-400 font-medium hover:underline mt-2 inline-block">
                    Get started for free
                </Link>
            </div>
        </div>
    );
}
