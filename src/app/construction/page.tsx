import type { Metadata } from 'next';
import ConstructionClient from './construction-client';

export const metadata: Metadata = {
    title: 'ORGNL FAKE — Coming Soon',
    description: 'Something extraordinary is being crafted. ORGNL FAKE creative agency — launching soon.',
};

export default function ConstructionPage() {
    return <ConstructionClient />;
}
