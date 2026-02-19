import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]",
                className
            )}
        >
            {children}
        </div>
    );
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
}

export function BentoCard({ children, className, colSpan = 1 }: BentoCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 overflow-hidden relative group",
                colSpan === 2 && "md:col-span-2",
                colSpan === 3 && "md:col-span-3",
                className
            )}
        >
            {children}
        </div>
    );
}
