import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('../../components/hero'));
const BloodInfo = lazy(() => import('../../components/blood-info'));
const DonationProcess = lazy(() => import('../../components/donation-process'));
const DonationEvent = lazy(() => import('../../components/donation-event'));
const Footer = lazy(() => import('../../components/footer'));
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Hero />
        <BloodInfo />
        <DonationProcess />
        <DonationEvent />
        <Footer />

      </Suspense>
    </div>
  );
}
