import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { getBloodTypes } from "../../../apis/bloodType.api";
import type { BloodType } from "../../../apis/bloodType.api";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Filter, Search, Info } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../../../components/ui/sheet";
import BloodDetailsModal from '../../../components/BloodDetailsModal';

type ComponentKey = "rbc" | "plasma" | "platelets" | "whole_blood";
const COMPONENTS: { key: ComponentKey; label: string }[] = [
  { key: "rbc", label: "RBC" },
  { key: "plasma", label: "Plasma" },
  { key: "platelets", label: "Platelets" },
  { key: "whole_blood", label: "Whole Blood" },
];

const BLOOD_TYPE_OPTIONS = [
  { value: "all", label: "All Blood Types" },
  { value: "O-", label: "O-" },
  { value: "O+", label: "O+" },
  { value: "A-", label: "A-" },
  { value: "A+", label: "A+" },
  { value: "B-", label: "B-" },
  { value: "B+", label: "B+" },
  { value: "AB-", label: "AB-" },
  { value: "AB+", label: "AB+" },
];

export default function BloodInfoSection() {
  const location = useLocation();
  const [selectedBloodType, setSelectedBloodType] = useState<string>("all");
  const [selectedComponent, setSelectedComponent] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { data: bloodTypes = [], isLoading } = useQuery({
    queryKey: ["bloodTypes"],
    queryFn: getBloodTypes,
  });

  // Handle state from navigation
  useEffect(() => {
    if (location.state?.selectedBloodType) {
      setSelectedBloodType(location.state.selectedBloodType);
    }
  }, [location.state]);

  // Filter blood types based on selected filters
  const filteredBloodTypes = bloodTypes.filter((blood: BloodType) => {
    const bloodTypeMatch =
      selectedBloodType === "all" || blood.bloodType === selectedBloodType;
    return bloodTypeMatch;
  });

  const handleBloodTypeChange = (bloodType: string) => {
    setSelectedBloodType(bloodType);
    setMobileFilterOpen(false);
  };

  const handleComponentChange = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <section className=" bg-muted/50">
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Blood Infos
            </h1>
            <p className="text-lg text-red-100 max-w-2xl">
              Explore compatibility for each blood type and component.
            </p>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Blood Types</h3>
              <div className="space-y-1">
                {BLOOD_TYPE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      selectedBloodType === option.value ? "default" : "ghost"
                    }
                    className={`w-full justify-start ${
                      selectedBloodType === option.value
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : ""
                    }`}
                    onClick={() => handleBloodTypeChange(option.value)}
                  >
                    <span>{option.label}</span>
                  </Button>
                ))}
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Components</h3>
              <div className="space-y-1">
                <Button
                  variant={selectedComponent === "all" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    selectedComponent === "all"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : ""
                  }`}
                  onClick={() => handleComponentChange("all")}
                >
                  All Components
                </Button>
                {COMPONENTS.map((comp) => (
                  <Button
                    key={comp.key}
                    variant={
                      selectedComponent === comp.key ? "default" : "ghost"
                    }
                    className={`w-full justify-start ${
                      selectedComponent === comp.key
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : ""
                    }`}
                    onClick={() => handleComponentChange(comp.key)}
                  >
                    {comp.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-2xl font-bold">Blood Types</h2>
              <div className="flex gap-2">
                <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <h3 className="text-lg font-semibold mb-4">Blood Types</h3>
                    <div className="space-y-1">
                      {BLOOD_TYPE_OPTIONS.map((option) => (
                        <Button
                          key={option.value}
                          variant={
                            selectedBloodType === option.value ? "default" : "ghost"
                          }
                          className={`w-full justify-start ${
                            selectedBloodType === option.value
                              ? "bg-red-600 hover:bg-red-700"
                              : ""
                          }`}
                          onClick={() => handleBloodTypeChange(option.value)}
                        >
                          <span>{option.label}</span>
                        </Button>
                      ))}
                    </div>
                    <Separator className="my-6" />
                    <h3 className="text-lg font-semibold mb-4">Components</h3>
                    <div className="space-y-1">
                      <Button
                        variant={
                          selectedComponent === "all" ? "default" : "ghost"
                        }
                        className={`w-full justify-start ${
                          selectedComponent === "all"
                            ? "bg-red-600 hover:bg-red-700"
                            : ""
                        }`}
                        onClick={() => handleComponentChange("all")}
                      >
                        All Components
                      </Button>
                      {COMPONENTS.map((comp) => (
                        <Button
                          key={comp.key}
                          variant={
                            selectedComponent === comp.key ? "default" : "ghost"
                          }
                          className={`w-full justify-start ${
                            selectedComponent === comp.key
                              ? "bg-red-600 hover:bg-red-700"
                              : ""
                          }`}
                          onClick={() => handleComponentChange(comp.key)}
                        >
                          {comp.label}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="hidden lg:block mb-6">
              <h2 className="text-2xl font-bold">
                {selectedBloodType === "all"
                  ? "All Blood Types"
                  : `Blood Type ${selectedBloodType}`}
              </h2>
              <p className="text-muted-foreground">
                {filteredBloodTypes.length}{" "}
                {filteredBloodTypes.length === 1
                  ? "blood type"
                  : "blood types"}{" "}
                found
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Loading blood types...</div>
            ) : filteredBloodTypes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBloodTypes.map((blood: BloodType) => (
                  <Card key={blood._id} className="h-fit">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold text-red-600">
                        {blood.bloodType}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {COMPONENTS.map((comp) => {
                        // Show all components or filter by selected component
                        if (selectedComponent !== "all" && selectedComponent !== comp.key) {
                          return null;
                        }

                        const compatibility = blood.compatibility?.[comp.key];
                        if (!compatibility) return null;

                        const donatesToList = compatibility.donateTo || [];
                        const receivesFromList = compatibility.receiveFrom || [];

                        return (
                          <div key={comp.key} className="space-y-2">
                            <h4 className="font-semibold text-sm text-blue-600 border-b border-blue-200 pb-1">
                              {comp.label}
                            </h4>
                            <div className="text-sm space-y-2 pl-2">
                              <div className="flex items-start gap-2">
                                <span className="text-green-600 font-medium min-w-[80px]">Donates to:</span>
                                <div className="flex-1">
                                  {donatesToList.length > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                      {donatesToList.slice(0, 3).map((b: any, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs text-green-700 border-green-300">
                                          {b.bloodType || b._id}
                                        </Badge>
                                      ))}
                                      {donatesToList.length > 3 && (
                                        <Badge variant="outline" className="text-xs text-gray-500">
                                          +{donatesToList.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-500 text-xs">None</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-orange-600 font-medium min-w-[80px]">Receives from:</span>
                                <div className="flex-1">
                                  {receivesFromList.length > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                      {receivesFromList.slice(0, 3).map((b: any, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs text-orange-700 border-orange-300">
                                          {b.bloodType || b._id}
                                        </Badge>
                                      ))}
                                      {receivesFromList.length > 3 && (
                                        <Badge variant="outline" className="text-xs text-gray-500">
                                          +{receivesFromList.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-500 text-xs">None</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}            
                      {/* Add the detailed modal button */}
                      <div className="pt-2 border-t">
                        <BloodDetailsModal bloodType={blood}>
                          <Button variant="outline" className="w-full" size="sm">
                            <Info className="h-4 w-4 mr-2" />
                            View Detailed Information
                          </Button>
                        </BloodDetailsModal>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-muted-foreground">
                  <Search className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No blood types found</h3>
                <p className="mt-2 text-muted-foreground">
                  We couldn't find any blood types matching your filter criteria.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedBloodType("all");
                    setSelectedComponent("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
