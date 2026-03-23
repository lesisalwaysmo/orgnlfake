"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Instagram, TrendingUp, Users, Eye, MapPin, Globe, User, Activity } from "lucide-react";
import type { AnalyticsData } from "@/lib/generate-analytics";

interface InstagramAnalyticsProps {
  analytics: AnalyticsData;
  username: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function InstagramAnalytics({ analytics, username }: InstagramAnalyticsProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-2xl shadow-sm border border-white/10 bg-black/20 backdrop-blur-sm font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-xl text-white shadow-md">
            <Instagram size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Instagram Overview</h2>
            <p className="text-sm text-[#a0a0a0]">
              Estimated analytics for @{username}
            </p>
          </div>
        </div>
        <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[#a0a0a0] outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Reach */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-[#a0a0a0]">Total Reach</h3>
            <Eye size={18} className="text-purple-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">
              {formatNumber(analytics.totalReach)}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} className="mr-1" /> +{analytics.reachGrowth}%
            </span>
          </div>
        </div>

        {/* New Followers */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-[#a0a0a0]">New Followers</h3>
            <Users size={18} className="text-pink-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">
              {formatNumber(analytics.newFollowers)}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} className="mr-1" /> +{analytics.followersGrowth}%
            </span>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="p-5 rounded-xl border border-white/10 bg-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-[#a0a0a0]">Engagement Rate</h3>
            <TrendingUp size={18} className="text-yellow-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">
              {analytics.engagementRate}
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} className="mr-1" /> +{analytics.engagementGrowth}%
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[350px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={analytics.dailyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {/* Gradient for Reach (Purple) */}
              <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              {/* Gradient for Followers (Pink) */}
              <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a0a0a0", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a0a0a0", fontSize: 12 }}
              tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 10, 10, 0.95)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                color: "#fff",
              }}
              labelStyle={{ fontWeight: "bold", color: "#e5e5e5" }}
              itemStyle={{ color: "#d1d5db" }}
            />

            {/* Area Line 1: Reach */}
            <Area
              type="monotone"
              dataKey="reach"
              name="Account Reach"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorReach)"
            />

            {/* Area Line 2: Followers */}
            <Area
              type="monotone"
              dataKey="followers"
              name="Follower Growth"
              stroke="#ec4899"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorFollowers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Demographics Section */}
      {analytics.demographics && (
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Audience Demographics</h3>
            <p className="text-sm text-[#a0a0a0]">Estimated breakdown of followers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gender List */}
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <User size={16} className="text-pink-400" />
                <h4 className="text-sm font-medium text-white">Gender</h4>
              </div>
              <div className="space-y-3">
                {analytics.demographics.gender.map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="text-[#a0a0a0]">{item.name}</span>
                    <span className="font-medium text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-purple-400" />
                <h4 className="text-sm font-medium text-white">Age Range</h4>
              </div>
              <div className="space-y-2.5">
                {analytics.demographics.ageGroups.slice(0, 5).map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="w-12 text-xs text-[#a0a0a0]">{item.name}</span>
                    <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                        style={{ width: `${item.value}%` }} 
                      />
                    </div>
                    <span className="text-xs font-medium text-white w-8 text-right">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cities */}
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-blue-400" />
                <h4 className="text-sm font-medium text-white">Top Cities</h4>
              </div>
              <div className="space-y-3">
                {analytics.demographics.topCities.map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="text-[#a0a0a0] truncate mr-2">{item.name}</span>
                    <span className="font-medium text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={16} className="text-emerald-400" />
                <h4 className="text-sm font-medium text-white">Top Countries</h4>
              </div>
              <div className="space-y-3">
                {analytics.demographics.topCountries.map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="text-[#a0a0a0] truncate mr-2">{item.name}</span>
                    <span className="font-medium text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
