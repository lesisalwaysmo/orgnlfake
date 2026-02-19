export const metadata = {
    title: "Contact | Orgnlfake",
    description: "The Booking Hub",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Contact</h1>
                <p className="text-muted-foreground text-lg">
                    The Booking Hub.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border rounded-xl border-dashed p-8">
                <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Our booking hub is being set up.</p>
            </div>
        </div>
    );
}
