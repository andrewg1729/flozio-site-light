import type { Metadata } from 'next';
import './globals.css';
import './ditto.css';

export const metadata: Metadata = {
  title: 'Flozio | Sales engagement for every conversation',
  description: 'Plan outreach, work the next step, and keep every follow-up in context with Flozio sales engagement software.',
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/favicon.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="box flow type">{children}</body>
    </html>
  );
}
