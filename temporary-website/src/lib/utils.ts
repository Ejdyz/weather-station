import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { timingSafeEqual } from "crypto"

/**
 * Compares two strings in a timing-safe manner to prevent timing attacks.
 * @param compare - The string to compare.
 * @param expected - The expected string to compare against, defaults to process.env.API_KEY.
 * @returns {boolean} - Returns true if the strings match, false otherwise.
 */
export function timingSafeCryptoCompare(compare: string, expected: string | undefined = process.env.API_KEY): boolean {
  if (!expected || compare.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(
    Buffer.from(compare, 'utf8'),
    Buffer.from(expected, 'utf8')
  );
}