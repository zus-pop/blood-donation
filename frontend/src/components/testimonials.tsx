import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=40&width=40",
    quote:
      "I donate blood regularly because my sister needed transfusions during her cancer treatment. It's such a simple way to potentially save someone's life.",
    donorType: "Regular Donor",
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/placeholder.svg?height=40&width=40",
    quote:
      "After receiving blood following a car accident, I committed to donating whenever I can. It's my way of paying it forward.",
    donorType: "Recipient & Donor",
  },
  {
    id: 3,
    name: "Aisha Patel",
    image: "/placeholder.svg?height=40&width=40",
    quote:
      "As a nurse, I've seen firsthand how blood donations save lives every day. That's why I donate and encourage others to do the same.",
    donorType: "Healthcare Worker",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Donor Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who have experienced the impact of blood donation
            firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.donorType}
                    </p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">
            Read More Stories
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
