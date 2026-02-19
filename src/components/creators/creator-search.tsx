"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatorSearchProps {
    className?: string;
}

export function CreatorSearch({ className }: CreatorSearchProps) {
    const [username, setUsername] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            // Navigate to the creator's media kit page
            const cleanUsername = username.trim().replace(/^@/, ""); // Remove @ if present
            router.push(`/${cleanUsername}`);
        }
    };

    return (
        <div className={cn("w-full", className)}>
            <form onSubmit={handleSearch} className="relative">
                <div
                    className={cn(
                        "relative flex items-center rounded-xl border bg-black/20 backdrop-blur-sm transition-all duration-300",
                        isFocused
                            ? "border-indigo-500/50 shadow-lg shadow-indigo-500/20"
                            : "border-white/10 hover:border-white/20"
                    )}
                >
                    {/* Search Icon */}
                    <div className="pl-4">
                        <Search className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search by username (e.g. @johndoe)"
                        className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-muted-foreground focus:outline-none"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!username.trim()}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 mr-2 rounded-lg font-medium text-sm transition-all",
                            username.trim()
                                ? "bg-white text-black hover:bg-white/90 active:scale-[0.98]"
                                : "bg-white/10 text-white/40 cursor-not-allowed"
                        )}
                    >
                        <User className="w-4 h-4" />
                        View Media Kit
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Helper Text */}
                <p className="mt-2 text-xs text-muted-foreground text-center">
                    Know a creator's username? Enter it above to view their media kit directly.
                </p>
            </form>
        </div>
    );
}
