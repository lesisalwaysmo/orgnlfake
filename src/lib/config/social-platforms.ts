export type SocialPlatform = 'youtube' | 'instagram' | 'tiktok' | 'twitch' | 'facebook' | 'twitter';

interface PlatformConfig {
    authUrl: string;
    tokenUrl: string;
    clientIdEnv: string;
    clientSecretEnv: string;
    scopes: string[];
    getRedirectUrl: (baseUrl: string) => string;
}

export const SOCIAL_PLATFORMS: Record<SocialPlatform, PlatformConfig> = {
    youtube: {
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        clientIdEnv: 'YOUTUBE_CLIENT_ID',
        clientSecretEnv: 'YOUTUBE_CLIENT_SECRET',
        scopes: [
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/yt-analytics.readonly'
        ],
        getRedirectUrl: (baseUrl) => `${baseUrl}/api/connect/youtube/callback`
    },
    instagram: {
        authUrl: 'https://api.instagram.com/oauth/authorize',
        tokenUrl: 'https://api.instagram.com/oauth/access_token',
        clientIdEnv: 'INSTAGRAM_CLIENT_ID',
        clientSecretEnv: 'INSTAGRAM_CLIENT_SECRET',
        scopes: ['user_profile', 'user_media'],
        getRedirectUrl: (baseUrl) => `${baseUrl}/api/connect/instagram/callback`
    },
    facebook: {
        authUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
        tokenUrl: 'https://graph.facebook.com/v19.0/oauth/access_token',
        clientIdEnv: 'FACEBOOK_CLIENT_ID',
        clientSecretEnv: 'FACEBOOK_CLIENT_SECRET',
        scopes: ['pages_show_list', 'read_insights', 'pages_read_engagement'],
        getRedirectUrl: (baseUrl) => `${baseUrl}/api/connect/facebook/callback`
    },
    tiktok: {
        authUrl: 'https://www.tiktok.com/v2/auth/authorize/',
        tokenUrl: 'https://open.tiktokapis.com/v2/oauth/token/',
        clientIdEnv: 'TIKTOK_CLIENT_ID',
        clientSecretEnv: 'TIKTOK_CLIENT_SECRET',
        scopes: ['user.info.basic', 'user.info.stats', 'video.list'],
        getRedirectUrl: (baseUrl) => `${baseUrl}/api/connect/tiktok/callback`
    },
    twitter: {
        authUrl: 'https://twitter.com/i/oauth2/authorize',
        tokenUrl: 'https://api.twitter.com/2/oauth2/token',
        clientIdEnv: 'TWITTER_CLIENT_ID',
        clientSecretEnv: 'TWITTER_CLIENT_SECRET',
        scopes: ['tweet.read', 'users.read', 'offline.access'],
        getRedirectUrl: (baseUrl) => `${baseUrl}/api/connect/twitter/callback`
    },
    twitch: {
        authUrl: 'https://id.twitch.tv/oauth2/authorize',
        tokenUrl: 'https://id.twitch.tv/oauth2/token',
        clientIdEnv: 'TWITCH_CLIENT_ID',
        clientSecretEnv: 'TWITCH_CLIENT_SECRET',
        scopes: ['user:read:broadcast', 'analytics:read:games'],
        getRedirectUrl: (baseUrl) => `${baseUrl}/api/connect/twitch/callback`
    }
};
