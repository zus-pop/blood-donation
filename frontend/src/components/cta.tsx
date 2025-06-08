import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="py-16 bg-red-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
          Your donation can save up to three lives. Schedule an appointment
          today or find a blood drive near you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-red-600 hover:bg-red-100">
            Schedule Donation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-red-700"
          >
            Find a Blood Drive
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
