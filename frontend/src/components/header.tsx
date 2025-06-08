import { Droplets, Menu, User } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
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
  );
};

export default Header;
