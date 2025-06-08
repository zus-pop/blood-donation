import { ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";

const FAQ = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about blood donation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who can donate blood?</AccordionTrigger>
              <AccordionContent>
                Most people who are healthy, at least 17 years old (16 with
                parental consent in some states), and weigh at least 110 pounds
                can donate blood. However, eligibility requirements may vary
                based on specific health conditions, medications, and travel
                history.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How often can I donate blood?</AccordionTrigger>
              <AccordionContent>
                You can donate whole blood every 56 days (about 8 weeks). If you
                donate platelets, you can give every 7 days up to 24 times a
                year. Plasma donors can donate every 28 days, and double red
                cell donors can give every 112 days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Does donating blood hurt?</AccordionTrigger>
              <AccordionContent>
                Most donors report only feeling a brief pinch when the needle is
                inserted. The actual donation process is typically painless. Our
                trained staff works to make your experience as comfortable as
                possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How long does the donation process take?
              </AccordionTrigger>
              <AccordionContent>
                The entire process takes about one hour from registration to
                refreshments. The actual blood donation only takes about 8-10
                minutes. First-time donors may need a little extra time for
                additional questions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Is it safe to donate blood during COVID-19?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we follow strict safety protocols to protect donors and
                staff. These include enhanced disinfection, social distancing
                measures, temperature checks, and requiring masks for all staff
                and donors.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 text-center">
            <Button variant="outline">
              View All FAQs
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
