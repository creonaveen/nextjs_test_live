'use client';

import { useParams } from 'next/navigation';

import { Top50Table } from './components/top50Table';

export default function Top50Page() {
  const params = useParams();
  const partner_slug = params.partner_slug as string;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Top50Table partner_slug={partner_slug} />
    </main>
  );
}
