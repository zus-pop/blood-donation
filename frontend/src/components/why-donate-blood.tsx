import { Droplets, Heart, Users } from "lucide-react";
import { Button } from "./ui/button";

const WhyDonateBlood = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Why Your Donation Matters
            </h2>
            <p className="text-lg mb-6">
              Blood cannot be manufactured – it can only come from generous
              donors like you. Your donation can help:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-4 mt-1 bg-red-100 p-1 rounded-full">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <strong>Save up to 3 lives</strong> with a single donation
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 bg-red-100 p-1 rounded-full">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <strong>Support cancer patients</strong> undergoing
                  chemotherapy
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-4 mt-1 bg-red-100 p-1 rounded-full">
                  <Droplets className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <strong>Help trauma victims</strong> in emergency situations
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="bg-red-600 hover:bg-red-700">
                Learn More About Impact
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
