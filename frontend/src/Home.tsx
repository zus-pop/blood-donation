"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronRight,
  Clock,
  Droplets,
  Heart,
  Info,
  MapPin,
  Menu,
  Phone,
  Search,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const upcomingDrives = [
    {
      id: 1,
      location: "Central Community Center",
      address: "123 Main Street, Downtown",
      date: "June 5, 2025",
      time: "9:00 AM - 4:00 PM",
      slotsAvailable: 12,
    },
    {
      id: 2,
      location: "Westside Medical Plaza",
      address: "456 Park Avenue, Westside",
      date: "June 8, 2025",
      time: "10:00 AM - 3:00 PM",
      slotsAvailable: 8,
    },
    {
      id: 3,
      location: "Eastside University Campus",
      address: "789 College Road, Eastside",
      date: "June 12, 2025",
      time: "11:00 AM - 5:00 PM",
      slotsAvailable: 15,
    },
  ];

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

  const bloodTypeNeeds = [
    { type: "O-", status: "Critical Need", color: "bg-red-500" },
    { type: "O+", status: "High Need", color: "bg-orange-500" },
    { type: "A-", status: "Moderate Need", color: "bg-yellow-500" },
    { type: "A+", status: "Stable", color: "bg-green-500" },
    { type: "B-", status: "High Need", color: "bg-orange-500" },
    { type: "B+", status: "Moderate Need", color: "bg-yellow-500" },
    { type: "AB-", status: "Stable", color: "bg-green-500" },
    { type: "AB+", status: "Stable", color: "bg-green-500" },
  ];

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full px-5 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">LifeStream</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium hover:text-red-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-red-600 transition-colors"
            >
              Donate
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-red-600 transition-colors"
            >
              Find Drives
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-red-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-red-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button className="hidden md:flex bg-red-600 hover:bg-red-700">
              Donate Now
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-6">
                  <a
                    href="#"
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-lg font-medium text-muted-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Donate
                  </a>
                  <a
                    href="#"
                    className="text-lg font-medium text-muted-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Find Drives
                  </a>
                  <a
                    href="#"
                    className="text-lg font-medium text-muted-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-lg font-medium text-muted-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <Separator />
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Donate Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Blood Type Needs */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Current Blood Supply
            </h2>
            <p className="text-muted-foreground">
              These blood types are currently needed in our community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodTypeNeeds.map((blood) => (
              <Card key={blood.type} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold">
                    {blood.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`inline-block w-3 h-3 rounded-full ${blood.color} mb-2`}
                  ></div>
                  <p className="text-sm font-medium">{blood.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-red-600 hover:bg-red-700">
              Find Your Blood Type
            </Button>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
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

      {/* Donation Process */}
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
              The entire process takes about 1 hour, with the actual donation
              only taking 8-10 minutes.
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              Schedule Your Donation
            </Button>
          </div>
        </div>
      </section>

      {/* Find a Blood Drive */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Find a Blood Drive Near You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We host blood drives throughout the community. Find one convenient
              for you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Enter your zip code" />
              </div>
              <div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                    <SelectItem value="50">Within 50 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {upcomingDrives.map((drive) => (
              <Card key={drive.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{drive.location}</h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{drive.address}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-red-600" />
                          <span className="text-sm">{drive.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-red-600" />
                          <span className="text-sm">{drive.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Badge variant="outline" className="text-green-600">
                        {drive.slotsAvailable} slots available
                      </Badge>
                      <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                        Schedule Appointment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">
              View All Blood Drives
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
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

      {/* FAQ Section */}
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
                  parental consent in some states), and weigh at least 110
                  pounds can donate blood. However, eligibility requirements may
                  vary based on specific health conditions, medications, and
                  travel history.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How often can I donate blood?
                </AccordionTrigger>
                <AccordionContent>
                  You can donate whole blood every 56 days (about 8 weeks). If
                  you donate platelets, you can give every 7 days up to 24 times
                  a year. Plasma donors can donate every 28 days, and double red
                  cell donors can give every 112 days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Does donating blood hurt?</AccordionTrigger>
                <AccordionContent>
                  Most donors report only feeling a brief pinch when the needle
                  is inserted. The actual donation process is typically
                  painless. Our trained staff works to make your experience as
                  comfortable as possible.
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
                  measures, temperature checks, and requiring masks for all
                  staff and donors.
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

      {/* CTA Section */}
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
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-red-100"
            >
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

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold">Bloody</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Connecting donors to those in need since 1985.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick as</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Donation Process
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Find a Drive
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Host a Drive
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Eligibility
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Blood Types
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Donor Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    News & Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-red-600"
                  >
                    Research
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-muted-foreground">
                    123 Donation St, City, ST 12345
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-muted-foreground">(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-red-600"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-muted-foreground">
                    contact@lifestream.org
                  </span>
                </li>
              </ul>
              <div className="mt-4">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 LifeStream Blood Donation Center. All rights reserved.
            </p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="text-sm hover:text-red-600">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-red-600">
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:text-red-600">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
