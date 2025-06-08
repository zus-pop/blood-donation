import { Calendar, ChevronRight, Clock, MapPin, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const DonationEvent = () => {
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
  return (
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
  );
};

export default DonationEvent;
