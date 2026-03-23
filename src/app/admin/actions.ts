"use server";

import { revalidatePath } from "next/cache";
import { createClient, isAdmin } from "@/lib/supabase/server";

export async function approveUser(userId: string) {
    // 1. Verify Admin (Double Security)
    if (!(await isAdmin())) {
        throw new Error("Unauthorized");
    }

    const supabase = (await createClient()) as any;

    // 2. Update status to 'active'
    const { error } = await supabase
        .from("profiles")
        .update({ status: "active" })
        .eq("id", userId);

    if (error) {
        return { error: error.message };
    }

    // 3. Revalidate the approvals page to remove the user from the list
    revalidatePath("/admin/approvals");
    return { success: true };
}

export async function rejectUser(userId: string) {
    if (!(await isAdmin())) {
        throw new Error("Unauthorized");
    }

    const supabase = (await createClient()) as any;

    const { error } = await supabase
        .from("profiles")
        .update({ status: "rejected" })
        .eq("id", userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/approvals");
    return { success: true };
}
