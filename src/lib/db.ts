import { createClient } from './supabase/server';

export default {
    async getTokenRecord(token: string) {
        const isConfigured =
            process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

        if (!isConfigured) {
            console.warn("Supabase not configured. Mocking invalid token.");
            return null;
        }

        try {
            const supabase = (await createClient()) as any;
            const { data, error } = await supabase
                .from('access_tokens')
                .select('*, request:access_requests(*)')
                .eq('token', token)
                .single();

            if (error || !data) return null;

            return {
                id: data.id,
                token: data.token,
                requestId: data.request_id,
                viewCount: data.view_count,
                deviceId: data.device_id,
                expiresAt: new Date(data.expires_at).getTime(),
                creatorUsername: data.request?.creator_username,
                category: data.request?.category,
            };
        } catch (error) {
            console.error("Database Error (getTokenRecord):", error);
            return null;
        }
    },

    async updateTokenVisit(tokenId: string, viewCount: number, deviceId?: string) {
        const isConfigured =
            process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

        if (!isConfigured) return;

        try {
            const supabase = (await createClient()) as any;
            const updateData: Record<string, unknown> = { view_count: viewCount };
            if (deviceId) {
                updateData.device_id = deviceId;
            }
            await supabase
                .from('access_tokens')
                .update(updateData)
                .eq('id', tokenId);
        } catch (error) {
            console.error("Database Error (updateTokenVisit):", error);
        }
    },

    // Legacy compatibility — kept for any existing code that calls markTokenAsUsed
    async markTokenAsUsed(token: string) {
        const isConfigured =
            process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

        if (!isConfigured) return;

        try {
            const supabase = (await createClient()) as any;
            await supabase
                .from('access_tokens')
                .update({ view_count: 2 })
                .eq('token', token);
        } catch (error) {
            console.error("Database Error (markTokenAsUsed):", error);
        }
    }
};
