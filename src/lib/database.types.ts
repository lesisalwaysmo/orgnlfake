// Database types for Supabase tables

export type UserStatus = 'pending' | 'active' | 'suspended' | 'rejected';
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';

// JSONB types for structured data
export interface SocialStats {
    followers?: number;
    following?: number;
    posts?: number;
    engagement_rate?: number;
    avg_likes?: number;
    avg_comments?: number;
    [key: string]: unknown;
}

export interface RateCard {
    post?: number;
    story?: number;
    reel?: number;
    video?: number;
    bundle?: number;
    currency?: string;
    [key: string]: unknown;
}

export interface MediaAsset {
    id: string;
    url: string;
    type: 'image' | 'video';
    thumbnail_url?: string;
    caption?: string;
    platform?: Platform;
    created_at?: string;
}

export interface CachedStats {
    followers?: number;
    following?: number;
    posts?: number;
    engagement_rate?: number;
    last_updated?: string;
    [key: string]: unknown;
}

// Table types
export interface Profile {
    id: string;
    username: string | null;
    status: UserStatus;
    bio?: string | null;
    website?: string | null;
    social_stats: SocialStats;
    rate_card: RateCard;
    media_assets: MediaAsset[];
    created_at: string;
    updated_at: string;
}

export interface ConnectedAccount {
    id: string;
    user_id: string;
    platform: Platform;
    access_token: string;
    refresh_token: string | null;
    token_expires_at: string | null;
    cached_stats: CachedStats;
    last_synced_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Admin {
    id: string;
    email: string;
    created_at: string;
}

// Insert types (for creating new records)
export interface ProfileInsert {
    id: string; // From auth.users
    username?: string;
    status?: UserStatus;
    bio?: string | null;
    website?: string | null;
    social_stats?: SocialStats;
    rate_card?: RateCard;
    media_assets?: MediaAsset[];
}

export interface ConnectedAccountInsert {
    user_id: string;
    platform: Platform;
    access_token: string;
    refresh_token?: string;
    token_expires_at?: string;
    cached_stats?: CachedStats;
}

export interface AdminInsert {
    email: string;
}

// Update types (for updating existing records)
export interface ProfileUpdate {
    username?: string;
    status?: UserStatus;
    bio?: string | null;
    website?: string | null;
    social_stats?: SocialStats;
    rate_card?: RateCard;
    media_assets?: MediaAsset[];
}

export interface ConnectedAccountUpdate {
    access_token?: string;
    refresh_token?: string;
    token_expires_at?: string;
    cached_stats?: CachedStats;
    last_synced_at?: string;
}

// Database schema type for Supabase client
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: ProfileInsert;
                Update: ProfileUpdate;
            };
            connected_accounts: {
                Row: ConnectedAccount;
                Insert: ConnectedAccountInsert;
                Update: ConnectedAccountUpdate;
            };
            admins: {
                Row: Admin;
                Insert: AdminInsert;
                Update: never;
            };
        };
        Functions: {
            is_admin: {
                Args: Record<string, never>;
                Returns: boolean;
            };
        };
    };
}
