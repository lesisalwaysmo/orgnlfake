import { cookies } from "next/headers";
import crypto from "crypto";
import db from "@/lib/db";
import { getCreatorPortfolioAssets } from "@/lib/portfolio-utils";

interface VaultPageProps {
    params: Promise<{ username: string }>;
    searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: VaultPageProps) {
    const { username } = await params;
    return {
        title: `Secure Vault — @${username} | Orgnlfake`,
        description: "Restricted content access — authorized viewers only.",
        robots: "noindex, nofollow",
    };
}

export default async function SecureVaultPage({ params, searchParams }: VaultPageProps) {
    const { username } = await params;
    const { token: tokenString } = await searchParams;

    // ─── GATE 0: No token provided ────────────────────
    if (!tokenString) {
        return <AccessDenied reason="No access token provided." />;
    }

    // ─── GATE 1: Token lookup ─────────────────────────
    const dbToken = await db.getTokenRecord(tokenString);
    if (!dbToken) {
        return <AccessDenied reason="Invalid or unrecognized token." />;
    }

    // ─── GATE 2: 24-Hour Time Limit ──────────────────
    if (Date.now() > dbToken.expiresAt) {
        return <LinkExpired reason="This link has expired (24 hours passed)." />;
    }

    // ─── GATE 3: View Limit (2 views max) ────────────
    if (dbToken.viewCount >= 2) {
        return <LinkExpired reason="This link has reached its maximum number of views." />;
    }

    // ─── GATE 4: Device Locking (Anti-Sharing) ───────
    const cookieStore = await cookies();
    const existingDeviceCookie = cookieStore.get("vault_device_lock")?.value;

    if (dbToken.viewCount === 0) {
        // First view: Create the lock and drop the cookie
        const newDeviceId = crypto.randomUUID();
        cookieStore.set("vault_device_lock", newDeviceId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400, // 24 hours
            path: "/",
        });
        await db.updateTokenVisit(dbToken.id, 1, newDeviceId);
    } else {
        // Second view: Check device match
        if (!existingDeviceCookie || existingDeviceCookie !== dbToken.deviceId) {
            return <AccessDenied reason="This link is locked to another device. Access denied." />;
        }
        await db.updateTokenVisit(dbToken.id, 2);
    }

    // ─── ALL SECURITY CHECKS PASSED ──────────────────
    const decodedUsername = decodeURIComponent(username);

    // Fetch restricted media from the creator's portfolio
    const mediaAssets = await getCreatorPortfolioAssets(decodedUsername);

    const viewsRemaining = Math.max(0, 2 - (dbToken.viewCount + 1));
    const expiresIn = new Date(dbToken.expiresAt);

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundColor: "#080808",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                color: "#e8e8e8",
            }}
        >
            {/* Security Header */}
            <header
                style={{
                    padding: "20px 40px",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backdropFilter: "blur(20px)",
                    background: "rgba(0,0,0,0.6)",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: viewsRemaining > 0 ? "#22c55e" : "#ef4444",
                            boxShadow: viewsRemaining > 0
                                ? "0 0 8px #22c55e"
                                : "0 0 8px #ef4444",
                        }}
                    />
                    <span
                        style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                            color: "#c9a86c",
                        }}
                    >
                        Secure Vault — @{decodedUsername}
                    </span>
                </div>
                <div style={{ display: "flex", gap: "24px", fontSize: "11px", color: "#666" }}>
                    <span>Views remaining: <strong style={{ color: viewsRemaining > 0 ? "#22c55e" : "#ef4444" }}>{viewsRemaining}</strong></span>
                    <span>Expires: <strong style={{ color: "#888" }}>{expiresIn.toLocaleString()}</strong></span>
                </div>
            </header>

            {/* Category Label */}
            {dbToken.category && (
                <div style={{ padding: "40px 40px 0", maxWidth: "1200px", margin: "0 auto" }}>
                    <span
                        style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.3em",
                            color: "#c9a86c",
                            display: "block",
                            marginBottom: "8px",
                        }}
                    >
                        {dbToken.category}
                    </span>
                    <h1
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                            fontWeight: 300,
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        Restricted Portfolio
                    </h1>
                </div>
            )}

            {/* Media Grid */}
            <div
                style={{
                    padding: "40px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {mediaAssets.length > 0 ? (
                        mediaAssets.map((item, index) => {
                            const url = typeof item === "string" ? item : item.url;
                            const category = typeof item === "string" ? "" : item.category;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        position: "relative",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        aspectRatio: "3/4",
                                        background: "#111",
                                    }}
                                >
                                    <img
                                        src={url}
                                        alt={category || `Restricted content ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {category && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: "20px 16px 12px",
                                                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                                                fontSize: "11px",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                color: "#999",
                                            }}
                                        >
                                            {category}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 20px", color: "#555" }}>
                            <p style={{ fontSize: "14px" }}>No media available for this vault.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Security Footer */}
            <footer
                style={{
                    padding: "40px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#444",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                }}
            >
                This content is strictly confidential. Unauthorized distribution is prohibited.
            </footer>
        </div>
    );
}

// ─── ACCESS DENIED COMPONENT ─────────────────────────
function AccessDenied({ reason }: { reason: string }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#080808",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            <div style={{ textAlign: "center", maxWidth: "400px", padding: "40px" }}>
                <div
                    style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        border: "2px solid #ef4444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                        boxShadow: "0 0 20px rgba(239,68,68,0.2)",
                    }}
                >
                    <span style={{ fontSize: "28px" }}>🔒</span>
                </div>
                <h1
                    style={{
                        fontSize: "24px",
                        fontWeight: 300,
                        color: "#e8e8e8",
                        margin: "0 0 12px",
                    }}
                >
                    Access Denied
                </h1>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>{reason}</p>
            </div>
        </div>
    );
}

// ─── LINK EXPIRED COMPONENT ─────────────────────────
function LinkExpired({ reason }: { reason: string }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#080808",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            <div style={{ textAlign: "center", maxWidth: "400px", padding: "40px" }}>
                <div
                    style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        border: "2px solid #f59e0b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                        boxShadow: "0 0 20px rgba(245,158,11,0.2)",
                    }}
                >
                    <span style={{ fontSize: "28px" }}>⏱️</span>
                </div>
                <h1
                    style={{
                        fontSize: "24px",
                        fontWeight: 300,
                        color: "#e8e8e8",
                        margin: "0 0 12px",
                    }}
                >
                    Link Expired
                </h1>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>{reason}</p>
                <p style={{ fontSize: "12px", color: "#444", marginTop: "24px" }}>
                    Contact the creator or admin to request a new link.
                </p>
            </div>
        </div>
    );
}
