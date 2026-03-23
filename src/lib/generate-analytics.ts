/**
 * Generates estimated 7-day analytics data from a creator's social stats.
 * Creates realistic daily reach & follower growth curves based on actual profile numbers.
 */

export interface SocialStats {
  followers?: number;
  engagement_rate?: string;
  total_reach?: number;
}

export interface DailyAnalytics {
  day: string;
  reach: number;
  followers: number;
}

export interface DemographicItem {
  name: string;
  value: number;
}

export interface Demographics {
  gender: DemographicItem[];
  ageGroups: DemographicItem[];
  topCities: DemographicItem[];
  topCountries: DemographicItem[];
}

export interface AnalyticsData {
  dailyData: DailyAnalytics[];
  totalReach: number;
  reachGrowth: number;
  newFollowers: number;
  followersGrowth: number;
  engagementRate: string;
  engagementGrowth: number;
  demographics: Demographics;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Variance multipliers to simulate realistic daily traffic patterns
// (weekdays lower, weekends higher)
const DAY_WEIGHTS = [0.7, 0.8, 0.95, 0.85, 1.1, 1.25, 1.35];

/**
 * Generate a seeded pseudo-random number from a string (username).
 * This ensures the same creator always gets the same "estimated" data.
 */
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const chr = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return (hash % 1000) / 1000;
  };
}

export function generateAnalyticsData(
  stats: SocialStats,
  username: string = "creator"
): AnalyticsData {
  const followers = stats.followers || 10000;
  const totalReach = stats.total_reach || followers * 2;
  const engagementRate = stats.engagement_rate || "3.5%";

  const rand = seededRandom(username);

  // Generate 7-day reach data
  // Distribute total_reach across 7 days using day weights + small variance
  const baseDaily = totalReach / 7;
  const dailyData: DailyAnalytics[] = DAYS.map((day, i) => {
    const variance = 0.85 + rand() * 0.3; // 0.85 – 1.15 range
    const reach = Math.round(baseDaily * DAY_WEIGHTS[i] * variance);

    // Follower growth: simulate gradual increase over the week
    // Start from ~85% of current and grow to current
    const startFollowers = Math.round(followers * 0.85);
    const growthPerDay = (followers - startFollowers) / 6;
    const dayFollowers = Math.round(startFollowers + growthPerDay * i + (rand() * growthPerDay * 0.3));

    return { day, reach, followers: dayFollowers };
  });

  // Calculate growth percentages (estimated)
  const newFollowersCount = Math.round(followers * 0.15);
  const reachGrowthPercent = 8 + rand() * 12; // 8% – 20%
  const followersGrowthPercent = 5 + rand() * 8; // 5% – 13%
  const engagementGrowthPercent = 1 + rand() * 4; // 1% – 5%

  // Generate seeded demographic distributions
  const femaleRatio = 45 + Math.round(rand() * 25);
  const maleRatio = 100 - femaleRatio;

  // South African city focus
  const cities = ["Johannesburg", "Cape Town", "Pretoria", "Durban", "Gqeberha", "Bloemfontein"];
  const topC1 = Math.round(30 + rand() * 15);
  const topC2 = Math.round(15 + rand() * 10);
  const topC3 = Math.round(8 + rand() * 8);
  const topC4 = Math.round(4 + rand() * 5);

  const countries = ["South Africa", "United States", "United Kingdom", "Nigeria", "Botswana", "Namibia"];
  const topN1 = Math.round(65 + rand() * 20);
  const topN2 = Math.round(5 + rand() * 5);
  const topN3 = Math.round(2 + rand() * 4);
  const topN4 = Math.round(1 + rand() * 3);

  const age18 = Math.round(35 + rand() * 20);
  const age25 = Math.round(25 + rand() * 15);
  const age13 = Math.round(5 + rand() * 10);
  const age35 = Math.round(10 + rand() * 10);
  const age45 = 100 - (age18 + age25 + age13 + age35);

  return {
    dailyData,
    totalReach,
    reachGrowth: Math.round(reachGrowthPercent * 10) / 10,
    newFollowers: newFollowersCount,
    followersGrowth: Math.round(followersGrowthPercent * 10) / 10,
    engagementRate,
    engagementGrowth: Math.round(engagementGrowthPercent * 10) / 10,
    demographics: {
      gender: [
        { name: "Female", value: femaleRatio },
        { name: "Male", value: maleRatio },
      ],
      ageGroups: [
        { name: "13-17", value: age13 },
        { name: "18-24", value: age18 },
        { name: "25-34", value: age25 },
        { name: "35-44", value: age35 },
        { name: "45+", value: age45 },
      ].sort((a, b) => b.value - a.value),
      topCities: [
        { name: cities[0], value: topC1 },
        { name: cities[1], value: topC2 },
        { name: cities[2], value: topC3 },
        { name: cities[3], value: topC4 },
      ],
      topCountries: [
        { name: countries[0], value: topN1 },
        { name: countries[1], value: topN2 },
        { name: countries[2], value: topN3 },
        { name: countries[3], value: topN4 },
      ],
    }
  };
}
