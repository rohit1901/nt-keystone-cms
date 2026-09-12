import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat("en-DE", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-DE", {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
});

export const formatDate = (date?: string, time = true) =>
  (time ? dateTimeFormatter : dateFormatter).format(new Date(date ?? Date.now()));
