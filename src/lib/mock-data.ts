import { SocialPlatform } from "@/lib/config/social-platforms";

export interface PlatformStats {
    followers: number;
    following: number;
    posts: number;
    engagement_rate: number;
    avg_likes: number;
    avg_comments: number;
    last_updated: string;
}

export interface AudienceStats {
    gender: {
        male: number;
        female: number;
        other: number;
    };
    age: {
        range: string;
        percentage: number;
    }[];
    topCities: {
        city: string;
        country: string;
        percentage: number;
    }[];
    topCountries: {
        country: string;
        code: string;
        percentage: number;
    }[];
}

export function generateMockStats(platform: SocialPlatform): PlatformStats {
    // deterministic-ish random based on platform for consistent feel
    const baseFollowers = {
        instagram: 12500,
        tiktok: 45000,
        youtube: 8200,
        twitter: 3400,
        facebook: 1500,
        twitch: 2100,
    };

    const baseEngagement = {
        instagram: 4.8,
        tiktok: 5.2,
        youtube: 3.1,
        twitter: 1.5,
        facebook: 0.8,
        twitch: 2.5,
    };

    const variance = () => 0.9 + Math.random() * 0.2; // +/- 10%

    const followers = Math.floor(baseFollowers[platform] * variance());

    return {
        followers: followers,
        following: Math.floor(Math.random() * 500) + 50,
        posts: Math.floor(Math.random() * 200) + 20,
        engagement_rate: Number((baseEngagement[platform] * variance()).toFixed(2)),
        avg_likes: Math.floor(followers * (baseEngagement[platform] / 100) * 0.8),
        avg_comments: Math.floor(followers * (baseEngagement[platform] / 100) * 0.05),
        last_updated: new Date().toISOString(),
    };
}

export function generateMockAudienceData(): AudienceStats {
    return {
        gender: {
            male: 42,
            female: 55,
            other: 3
        },
        age: [
            { range: "13-17", percentage: 5 },
            { range: "18-24", percentage: 32 },
            { range: "25-34", percentage: 41 },
            { range: "35-44", percentage: 14 },
            { range: "45-54", percentage: 5 },
            { range: "55+", percentage: 3 }
        ],
        topCities: [
            { city: "New York", country: "USA", percentage: 12 },
            { city: "London", country: "UK", percentage: 8 },
            { city: "Los Angeles", country: "USA", percentage: 7 },
            { city: "Toronto", country: "Canada", percentage: 5 },
            { city: "Sydney", country: "Australia", percentage: 4 }
        ],
        topCountries: [
            { country: "United States", code: "US", percentage: 38 },
            { country: "United Kingdom", code: "GB", percentage: 15 },
            { country: "Canada", code: "CA", percentage: 10 },
            { country: "Australia", code: "AU", percentage: 8 },
            { country: "Germany", code: "DE", percentage: 5 }
        ]
    };
}
