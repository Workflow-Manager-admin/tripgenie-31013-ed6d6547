/**
 * ============================================================================
 *  lib/utils.js (TripMosaic Vistara) - Utility Functions
 *  This module provides globally reusable utility functions for all components.
 *  - cn(...inputs): An ergonomic merge of Tailwind and clsx class merging.
 *    Use to combine dynamic or conditional Tailwind classnames robustly.
 *  Fully documented and recommended for all custom UI.
 * ============================================================================
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * PUBLIC_INTERFACE
 * cn
 * Utility to combine and merge class names using clsx + tailwind-merge.
 * 
 * @param  {...any} inputs - Any class name fragments/arrays/objects.
 * @returns {string} - A deduplicated, tailwind-aware class string.
 * @example
 *   cn("p-4", isActive && "text-black", ["bg-white", { hidden: false }])
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
