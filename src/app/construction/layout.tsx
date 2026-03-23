export default function ConstructionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="construction-layout">
            {children}
        </div>
    );
}
