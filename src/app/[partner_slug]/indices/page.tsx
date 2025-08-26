'use client';

import { useParams } from 'next/navigation';

import IndicesTable from './components/IndicesTab';

export default function IndicesPage() {
  const params = useParams();
  const partner_slug = params.partner_slug as string;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <IndicesTable partner_slug={partner_slug} />
    </main>
  );
}
