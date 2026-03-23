"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Production", href: "/production" },
    { label: "Services", href: "/services" },
    { label: "Content Creators", href: "/talent" },
    { label: "Join Us", href: "/join" },
    { label: "Contact", href: "/contact" },
];

export function MainNav() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
            <nav className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo - Left aligned */}
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            O
                        </div>
                        <span className="text-xl font-bold text-white tracking-tighter hover:text-white/90 transition-colors">
                            Orgnlfake
                        </span>
                    </Link>

                    {/* Desktop Navigation - Top Right Aligned */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-all duration-200",
                                    pathname === item.href
                                        ? "text-white"
                                        : "text-white/50 hover:text-white hover:bg-white/5 rounded-lg"
                                )}
                            >
                                {item.label}
                                {pathname === item.href && (
                                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-white/70 hover:text-white bg-white/5 rounded-xl border border-white/10"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-6 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "px-4 py-4 rounded-xl text-base font-medium transition-all",
                                        pathname === item.href
                                            ? "bg-white/10 text-white border border-white/10"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
