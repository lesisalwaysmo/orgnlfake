import { createClient } from './supabase/server';

export default {
    async getTokenRecord(token: string) {
        // Safe check for Supabase URL to allow dev iteration before configuring Supabase
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
                .from('portfolio_access_tokens')
                .select('*')
                .eq('token', token)
                .single();

            if (error || !data) return null;

            return {
                token: data.token,
                creatorId: data.creator_id,
                category: data.category,
                used: data.used,
                expiresAt: new Date(data.expires_at).getTime(),
            };
        } catch (error) {
            console.error("Database Error (getTokenRecord):", error);
            return null;
        }
    },

    async markTokenAsUsed(token: string) {
        const isConfigured = 
            process.env.NEXT_PUBLIC_SUPABASE_URL && 
            process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

        if (!isConfigured) return;

        try {
            const supabase = (await createClient()) as any;
            await supabase
                .from('portfolio_access_tokens')
                .update({ used: true })
                .eq('token', token);
        } catch (error) {
            console.error("Database Error (markTokenAsUsed):", error);
        }
    }
};
