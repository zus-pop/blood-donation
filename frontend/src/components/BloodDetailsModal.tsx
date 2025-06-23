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
import { Info, Droplets, Users, ArrowRight, ArrowLeft, Package } from "lucide-react";

interface BloodType {
  _id: string;
  bloodType: string;
  compatibility?: {
    [key: string]: {
      donateTo?: any[];
      receiveFrom?: any[];
    };
  };
  inventory?: {
    rbc?: { quantity_units?: number };
    plasma?: { quantity_units?: number };
    platelets?: { quantity_units?: number };
    whole_blood?: { quantity_units?: number };
  };
}

interface BloodDetailsModalProps {
  bloodType: BloodType;
  children?: React.ReactNode;
}

const COMPONENTS = [
  { key: "rbc", label: "Red Blood Cells (RBC)", inventoryKey: "rbc" },
  { key: "plasma", label: "Plasma", inventoryKey: "plasma" },
  { key: "platelets", label: "Platelets", inventoryKey: "platelets" },
  { key: "whole_blood", label: "Whole Blood", inventoryKey: "whole_blood" },
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
            Blood Type {bloodType.bloodType} - Detailed Information
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Blood Type</h4>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {bloodType.bloodType}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Total Inventory</h4>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">
                      {COMPONENTS.reduce((total, comp) => {
                        const quantity = bloodType.inventory?.[comp.inventoryKey as keyof typeof bloodType.inventory]?.quantity_units || 0;
                        return total + quantity;
                      }, 0)} units available
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {COMPONENTS.map((comp) => {
              const compatibility = bloodType.compatibility?.[comp.key];
              const inventoryData = bloodType.inventory?.[comp.inventoryKey as keyof typeof bloodType.inventory];
              const quantity = inventoryData?.quantity_units || 0;
              
              const donatesToList = compatibility?.donateTo || [];
              const receivesFromList = compatibility?.receiveFrom || [];

              return (
                <Card key={comp.key} className="border-t-4 border-t-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700 flex items-center justify-between">
                      <span>{comp.label}</span>
                      <Badge 
                        variant={quantity > 0 ? "default" : "secondary"} 
                        className={quantity > 0 ? "bg-green-600" : "bg-gray-400"}
                      >
                        {quantity} units
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Inventory Information */}
                    <div className={`p-3 rounded-lg ${quantity > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package className={`h-4 w-4 ${quantity > 0 ? 'text-green-600' : 'text-gray-500'}`} />
                          <span className={`font-medium ${quantity > 0 ? 'text-green-800' : 'text-gray-600'}`}>
                            Current Stock
                          </span>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${quantity > 0 ? 'text-green-700' : 'text-gray-500'}`}>
                            {quantity}
                          </div>
                          <div className="text-xs text-gray-500">units</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${quantity > 0 ? 'bg-green-500' : 'bg-gray-400'}`}
                            style={{ width: `${Math.min((quantity / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {quantity > 50 ? 'Good supply' : quantity > 20 ? 'Moderate supply' : quantity > 0 ? 'Low supply' : 'Out of stock'}
                        </div>
                      </div>
                    </div>

                    {compatibility && (
                      <>
                        <Separator />

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
                    )}

                    {!compatibility && (
                      <div className="text-center py-4 text-gray-500">
                        <p className="text-sm">No compatibility data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary Statistics */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inventory Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {COMPONENTS.map((comp) => {
                  const quantity = bloodType.inventory?.[comp.inventoryKey as keyof typeof bloodType.inventory]?.quantity_units || 0;
                  return (
                    <div key={comp.key} className="text-center">
                      <div className="text-2xl font-bold text-blue-700">{quantity}</div>
                      <div className="text-sm text-blue-600">{comp.label}</div>
                      <div className="text-xs text-gray-500">units</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BloodDetailsModal;