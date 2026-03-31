import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// This will be provided when running the script
const SUPABASE_SERVICE_ROLE_KEY = process.argv[2];

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Usage: npx tsx scripts/create-admins.ts <SUPABASE_SERVICE_ROLE_KEY>");
    process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const adminsToCreate = [
    { email: 'lesegolmodisakgosi@gmail.com', password: '4321indigoOFA' },
    { email: 'orgnfakecreators@gmail.com', password: '2425ekafOFA' }
];

async function createAdmins() {
    console.log("Starting admin creation process...");

    for (const admin of adminsToCreate) {
        console.log(`\nProcessing ${admin.email}...`);
        
        // 1. Create the user in auth.users (bypassing email confirmation)
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: admin.email,
            password: admin.password,
            email_confirm: true // Bypass email confirmation
        });

        if (authError) {
            console.error(`❌ Failed to create auth user for ${admin.email}:`, authError.message);
            continue;
        }

        console.log(`✅ Created auth user: ${authData.user.id}`);

        // 2. Add to public.admins table to grant admin privileges
        const { error: adminError } = await supabaseAdmin
            .from('admins')
            .insert({ email: admin.email });

        if (adminError) {
            console.error(`❌ Failed to add ${admin.email} to admins table:`, adminError.message);
            continue;
        }

        console.log(`✅ Granted admin privileges to ${admin.email}`);
    }

    console.log("\nFinished creating admins.");
}

createAdmins();
