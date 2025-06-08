import { Droplets, Heart, Info, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DonationProcess = () => {
  const donationSteps = [
    {
      title: "Registration",
      description: "Sign in, show ID, and complete a donor registration form.",
      icon: User,
    },
    {
      title: "Health Screening",
      description:
        "Brief physical examination and confidential health questionnaire.",
      icon: Info,
    },
    {
      title: "Donation",
      description: "The actual donation takes only about 8-10 minutes.",
      icon: Droplets,
    },
    {
      title: "Refreshments",
      description: "Enjoy snacks and drinks while resting for 15 minutes.",
      icon: Heart,
    },
  ];
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">The Donation Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Donating blood is a simple and straightforward process that
            typically takes less than an hour from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {donationSteps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>
                  Step {index + 1}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">
            The entire process takes about 1 hour, with the actual donation only
            taking 8-10 minutes.
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            Schedule Your Donation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
