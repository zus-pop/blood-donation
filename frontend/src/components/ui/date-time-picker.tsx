"use client";

import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined);
      return;
    }
    const newDate = new Date(date || new Date());
    newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    setDate(newDate);
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const newDate = new Date(date || new Date());
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
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toLocaleString() : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
        <div className="p-4 border-t border-border grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hour</Label>
            <Select onValueChange={(value) => handleTimeChange("hour", value)} value={date?.getHours().toString().padStart(2, '0')}>
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
            <Select onValueChange={(value) => handleTimeChange("minute", value)} value={date?.getMinutes().toString().padStart(2, '0')}>
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