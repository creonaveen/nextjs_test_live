'use client';

import { useParams } from 'next/navigation';

import { StocksTable } from './components/stockTables';

export default function StocksPage() {
  const params = useParams();
  const partner_slug = params.partner_slug as string;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <StocksTable partner_slug={partner_slug} />
    </main>
  );
}
