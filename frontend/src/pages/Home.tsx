import BloodInfo from "../components/blood-info";
import DonationEvent from "../components/donation-event";
import DonationProcess from "../components/donation-process";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Blood Type Needs */}
      <BloodInfo />

      {/* Why Donate Section */}
      {/* <WhyDonateBlood /> */}

      {/* Donation Process */}
      <DonationProcess />

      {/* Find a Blood Drive */}
      <DonationEvent />

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* FAQ Section */}
      {/* <FAQ /> */}

      {/* CTA Section */}
      {/* <CTA /> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
