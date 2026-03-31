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

// Access Request types (Lead Capture)
export type AccessRequestStatus = 'PENDING' | 'APPROVED' | 'EXPIRED';

export interface AccessRequest {
    id: string;
    client_name: string;
    client_email: string;
    client_link: string;
    category: string;
    creator_username: string;
    status: AccessRequestStatus;
    created_at: string;
    updated_at: string;
}

export interface AccessRequestInsert {
    client_name: string;
    client_email: string;
    client_link: string;
    category: string;
    creator_username: string;
    status?: AccessRequestStatus;
}

export interface AccessRequestUpdate {
    status?: AccessRequestStatus;
}

// Access Token types (Fort Knox Security)
export interface AccessToken {
    id: string;
    token: string;
    request_id: string;
    view_count: number;
    device_id: string | null;
    expires_at: string;
    created_at: string;
}

export interface AccessTokenInsert {
    token: string;
    request_id: string;
    view_count?: number;
    device_id?: string;
    expires_at: string;
}

export interface AccessTokenUpdate {
    view_count?: number;
    device_id?: string;
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
            access_requests: {
                Row: AccessRequest;
                Insert: AccessRequestInsert;
                Update: AccessRequestUpdate;
            };
            access_tokens: {
                Row: AccessToken;
                Insert: AccessTokenInsert;
                Update: AccessTokenUpdate;
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
