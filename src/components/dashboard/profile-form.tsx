"use client";

import { useState } from "react";
import { updateProfile } from "@/app/dashboard/actions";
import { Loader2, Save, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileFormProps {
    initialData: {
        username: string;
        bio: string;
        website: string;
    };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await updateProfile(formData);

        setLoading(false);
        if ((result as any).success) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } else {
            alert("Failed to update profile");
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {/* Cover Photo Placeholder */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-muted-foreground">Cover Photo</label>
                <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                    {/* Default Abstract Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-white/10 flex items-center justify-center">
                        <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                            <Upload className="w-8 h-8 mx-auto mb-2" />
                            <span className="text-sm">Upload Cover</span>
                        </div>
                    </div>
                    {/* Upload Input Overlay (Visual Only for now) */}
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-muted-foreground">Username</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                        <input
                            id="username"
                            name="username"
                            defaultValue={initialData.username}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-neutral-600"
                            placeholder="username"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium text-muted-foreground">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        defaultValue={initialData.bio}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-neutral-600"
                        placeholder="Tell your story..."
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium text-muted-foreground">Website</label>
                    <input
                        id="website"
                        name="website"
                        type="url"
                        defaultValue={initialData.website}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-neutral-600"
                        placeholder="https://yourportfolio.com"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all",
                            success
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-white text-black hover:bg-neutral-200"
                        )}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : success ? (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Saved Successfully</span>
                            </>
                        ) : (
                            <span>Save Changes</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
