import type { Metadata } from 'next';
import AdminPanel from './AdminPanel';

export const metadata: Metadata = {
  title: 'FoundersDream | Admin',
};

export default function AdminPage() {
  return (
    <main className="page">
      <AdminPanel />
    </main>
  );
}
