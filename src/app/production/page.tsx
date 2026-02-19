export const metadata = {
    title: "Production | Orgnlfake",
    description: "Business Portfolio: Work shot by our agency",
};

export default function ProductionPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Production</h1>
                <p className="text-muted-foreground text-lg">
                    Business Portfolio: Work shot by our agency.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border rounded-xl border-dashed p-8">
                <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Our production portfolio is being curated.</p>
            </div>
        </div>
    );
}
