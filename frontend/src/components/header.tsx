import { Droplets, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { openModal, isAuthenticated, user, logout } = useAuth();

  // Filter navigation list based on authentication status
  const getNavList = () => {
    const baseNavList = [
      {
        name: "Blogs",
        to: "/blogs",
      },
      {
        name: "Donation Events",
        to: "/donationevents",
      },
      {
        name: "Blood Infos",
        to: "/blood-infos",
      },
    ];

    // Only add Blood Requests if user is authenticated
    if (isAuthenticated) {
      baseNavList.splice(2, 0, {
        name: "Blood Requests",
        to: "/blrqsection",
      });
    }

    return baseNavList;
  };

  const navList = getNavList();

  // Handler for Request Blood Now button
  const handleRequestBloodClick = () => {
    if (isAuthenticated) {
      navigate("/bloodrequest");
    } else {
      openModal();
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full px-5 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">Bloody</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navList.map((nav) => (
            <NavLink
              key={nav.name}
              to={nav.to}
              className={({ isActive }: { isActive: boolean }) =>
                `text-lg font-medium ${isActive ? "text-red-600" : "text-muted-foreground"
                }`
              }
            >
              {nav.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden md:flex bg-red-600 hover:bg-red-700" onClick={() => navigate("/donationevents")}>Donate Now</Button>
          or
          <Button className="hidden md:flex bg-red-600 hover:bg-red-700" onClick={handleRequestBloodClick}>Request Blood Now</Button>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <User className="mr-2 h-4 w-4" />
                  {user?.firstName} {user?.lastName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="hidden md:flex" onClick={openModal}>
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                {navList.map((nav) => (
                  <NavLink
                    key={nav.name}
                    to={nav.to}
                    className="text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {nav.name}
                  </NavLink>
                ))}
                <Separator />
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => { navigate("/donationevents"); setMobileMenuOpen(false); }}>
                  Donate Now
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => { handleRequestBloodClick(); setMobileMenuOpen(false); }}>
                  Request Blood Now
                </Button>
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full" onClick={logout}>
                    <User className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={openModal}>
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
