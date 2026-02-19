"use client";

import React, { useState, useMemo } from "react";
import { HeroLoop } from "./hero-loop";
import { CategoryCards } from "./category-cards";
import { PortfolioMasonry } from "./portfolio-masonry";

interface PortfolioClientWrapperProps {
    mediaAssets: string[];
    reels?: string[];
    username: string;
}

export function PortfolioClientWrapper({ mediaAssets, reels, username }: PortfolioClientWrapperProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    // Process items
    // Since we don't have real categories in the array of strings, 
    // we will randomly assign them for the "Chromatic Shift" demo effect so filtering actually does something visually.
    // In a real app, mediaAssets would be an object with metadata.
    const processedItems = useMemo(() => {
        const categories = ["fashion", "beauty", "commercial"];
        return mediaAssets.map((url, i) => ({
            id: `item-${i}`,
            url,
            // Stable random assignment based on index
            category: categories[i % categories.length]
        }));
    }, [mediaAssets]);

    const filteredItems = useMemo(() => {
        if (!selectedCategory) return processedItems;
        return processedItems.filter(item => item.category === selectedCategory);
    }, [processedItems, selectedCategory]);

    return (
        <div className="min-h-screen bg-black text-white pb-20">

            {/* 1. The Hero Loop */}
            <section className="mb-12">
                <HeroLoop videos={reels} />
            </section>

            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-muted-foreground uppercase">Selected Works</h2>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 text-white">@{username}</h1>
                </div>

                {/* 2. The Category Cards */}
                <section className="mb-12 relative z-10">
                    <CategoryCards
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </section>

                {/* 3. The Masonry */}
                <section className="min-h-[500px]">
                    <PortfolioMasonry items={filteredItems} />
                </section>
            </div>
        </div>
    );
}
