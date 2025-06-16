import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ChevronRight as NextIcon } from "lucide-react";
import { Button } from "./ui/button";

const slides = [
  {
    image: "/src/assets/hero1.png",
    alt: "Blood donation hands",
  },
  {
    image: "/src/assets/hero2.png",
    alt: "Blood donation drop",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative min-h-[600px] md:min-h-[610px] flex items-center justify-center overflow-hidden">
      {slides.map((slide, idx) => (
        <img
          key={idx}
          src={slide.image}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100 z-0" : "opacity-0 z-0"}`}
        />
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 flex flex-col items-start max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          Your Donation Can Save Lives
        </h1>
        <p className="text-lg md:text-xl mb-8 text-red-100 drop-shadow">
          Every 2 seconds, someone in our community needs blood. Join thousands of donors and make a difference today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-white text-red-600 hover:bg-red-100">
            Schedule Donation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="text-red-700 hover:text-white hover:bg-red-500 border-2">
            Learn More
          </Button>
        </div>
      </div>
      {/* Controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
        onClick={next}
        aria-label="Next slide"
      >
        <NextIcon className="h-6 w-6" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-white ${idx === current ? "bg-white" : "bg-transparent"}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
