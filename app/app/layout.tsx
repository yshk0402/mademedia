import type { Metadata } from 'next';
import PageLoader from './components/PageLoader';
import './globals.css';

export const metadata: Metadata = {
  title: 'FoundersDream | Waitlist',
  description: 'Join the FoundersDream private beta and get early access.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
