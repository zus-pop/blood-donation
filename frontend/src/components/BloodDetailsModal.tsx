import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info, Droplets, Users, ArrowRight, ArrowLeft } from "lucide-react";

interface BloodType {
  _id: string;
  bloodType: string;
  compatibility?: {
    [key: string]: {
      donateTo?: any[];
      receiveFrom?: any[];
    };
  };
}

interface BloodDetailsModalProps {
  bloodType: BloodType;
  children?: React.ReactNode;
}

const COMPONENTS = [
  { key: "rbc", label: "Red Blood Cells (RBC)" },
  { key: "plasma", label: "Plasma" },
  { key: "platelets", label: "Platelets" },
  { key: "whole_blood", label: "Whole Blood" },
];

const BloodDetailsModal = ({ bloodType, children }: BloodDetailsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <Droplets className="h-6 w-6" />
            Blood Type {bloodType.bloodType} - Compatibility Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Card */}
          <Card className="border-l-4 border-l-red-600">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5" />
                Blood Type Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <h4 className="font-semibold text-gray-700 mb-2">Blood Type</h4>
                <Badge variant="secondary" className="text-2xl px-4 py-2">
                  {bloodType.bloodType}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  View compatibility information for different blood components
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Component Compatibility Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {COMPONENTS.map((comp) => {
              const compatibility = bloodType.compatibility?.[comp.key];
              const donatesToList = compatibility?.donateTo || [];
              const receivesFromList = compatibility?.receiveFrom || [];

              return (
                <Card key={comp.key} className="border-t-4 border-t-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">
                      {comp.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {compatibility ? (
                      <>
                        {/* Donation Compatibility */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-700">
                            <ArrowRight className="h-4 w-4" />
                            <span className="font-medium">Can Donate To:</span>
                          </div>
                          <div className="ml-6">
                            {donatesToList.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {donatesToList.map((bloodType: any, index) => (
                                  <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                                    {bloodType.bloodType || bloodType._id || bloodType}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">No compatible recipients</span>
                            )}
                          </div>
                        </div>

                        <Separator />

                        {/* Reception Compatibility */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-orange-700">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="font-medium">Can Receive From:</span>
                          </div>
                          <div className="ml-6">
                            {receivesFromList.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {receivesFromList.map((bloodType: any, index) => (
                                  <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                                    {bloodType.bloodType || bloodType._id || bloodType}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">No compatible donors</span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p className="text-sm">No compatibility data available for this component</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BloodDetailsModal;