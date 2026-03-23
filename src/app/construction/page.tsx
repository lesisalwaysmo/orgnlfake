import type { Metadata } from 'next';
import BankClient from './bank-client';

export const metadata: Metadata = {
    title: 'VAULT | The Future of Wealth',
    description: 'A new era of secure, borderless banking. Join the exclusive waitlist.',
};

export default function ConstructionPage() {
    return <BankClient />;
}
