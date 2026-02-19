"use client";

import { motion } from "framer-motion";
import { Users, MapPin, Globe, PieChart } from "lucide-react";
import { AudienceStats as AudienceStatsType } from "@/lib/mock-data";

interface AudienceStatsProps {
    data: AudienceStatsType;
}

export function AudienceStats({ data }: AudienceStatsProps) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gender Distribution */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Gender</h3>
                    </div>

                    <div className="space-y-4">
                        <GenderBar label="Female" percentage={data.gender.female} color="bg-pink-500" />
                        <GenderBar label="Male" percentage={data.gender.male} color="bg-blue-500" />
                        <GenderBar label="Other" percentage={data.gender.other} color="bg-zinc-500" />
                    </div>
                </div>

                {/* Age Range */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Age Range</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {data.age.map((item) => (
                            <div key={item.range} className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground w-12">{item.range}</span>
                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-blue-500/50"
                                    />
                                </div>
                                <span className="text-xs font-medium w-8 text-right">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Top Cities */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Top Cities</h3>
                    </div>

                    <div className="space-y-4">
                        {data.topCities.map((city, idx) => (
                            <LocationRow
                                key={city.city}
                                label={city.city}
                                sublabel={city.country}
                                percentage={city.percentage}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                            <Globe className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold">Top Countries</h3>
                    </div>

                    <div className="space-y-4">
                        {data.topCountries.map((country, idx) => (
                            <LocationRow
                                key={country.country}
                                label={country.country}
                                sublabel={country.code}
                                percentage={country.percentage}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function GenderBar({ label, percentage, color }: { label: string, percentage: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}

function LocationRow({ label, sublabel, percentage, index }: { label: string, sublabel: string, percentage: number, index: number }) {
    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-1 relative z-10">
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{sublabel}</span>
                </div>
                <span className="text-sm font-semibold">{percentage}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage * 2}%` }} // Scaling for visual impact
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-white/20"
                />
            </div>
        </div>
    );
}
