import type { Metadata } from 'next';
import BankClient from './bank-client';

export const metadata: Metadata = {
    title: 'ORGNLFAKE | Unfiltered Reality',
    description: 'High Fashion & Creative Arts platform. Connect with top content creators.',
};

export default function ConstructionPage() {
    return <BankClient />;
}
