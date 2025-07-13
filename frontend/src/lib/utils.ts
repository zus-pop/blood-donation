import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, showTime: boolean = true) {
  if (showTime) {
    return new Date(date).toLocaleTimeString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
    });
  } else {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
    });
  }
}
