'use client';

import dynamic from 'next/dynamic';
import './bank.css';

const TrailContainer = dynamic(() => import('@/components/TrailContainer'), { ssr: false });

export default function BankClient() {
    return (
        <div className="bank-page">
            <TrailContainer />
        </div>
    );
}
