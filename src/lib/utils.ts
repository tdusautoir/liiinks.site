import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmpty = (value: string): boolean => {
  return !value || value.trim() === "";
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

// Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number and one special character
export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export const getInitials = (username: string, lastname: string): string => {
  return `${username.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;
}