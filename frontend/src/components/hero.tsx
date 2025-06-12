import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative bg-red-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your Donation Can Save Lives
          </h1>
          <p className="text-lg md:text-xl mb-8 text-red-100">
            Every 2 seconds, someone in our community needs blood. Join
            thousands of donors and make a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-red-100"
            >
              Schedule Donation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-red-700 hover:text-white hover:bg-red-500 border-2"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-20 bg-cover bg-center"></div>
    </section>
  );
};

export default Hero;
