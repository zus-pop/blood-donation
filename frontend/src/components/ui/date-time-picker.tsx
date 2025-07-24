"use client";

import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disablePast?: boolean;
  disabled?: boolean;
}

export function DateTimePicker({ 
  date, 
  setDate, 
  disablePast = false, 
  disabled = false 
}: DateTimePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      return;
    }
    
    // If there's an existing date, preserve the time
    if (date) {
      const newDate = new Date(selectedDate);
      newDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
      setDate(newDate);
    } else {
      // If no existing date, set time to current time or default
      const newDate = new Date(selectedDate);
      const now = new Date();
      newDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
      setDate(newDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (!date) return;
    
    const newDate = new Date(date);
    if (type === "hour") {
      newDate.setHours(parseInt(value));
    } else {
      newDate.setMinutes(parseInt(value));
    }
    setDate(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal h-12",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            date.toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "short", 
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          ) : (
            <span>Pick a date and time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={disablePast ? (date) => date < today : undefined}
          initialFocus
        />
        <div className="p-4 border-t border-border grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hour</Label>
            <Select 
              onValueChange={(value) => handleTimeChange("hour", value)} 
              value={date?.getHours().toString().padStart(2, '0')}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                    {i.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Minute</Label>
            <Select 
              onValueChange={(value) => handleTimeChange("minute", value)} 
              value={date?.getMinutes().toString().padStart(2, '0')}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                 {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                    {i.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 