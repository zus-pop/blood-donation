import { Droplets, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
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
  );
};

export default Footer;
