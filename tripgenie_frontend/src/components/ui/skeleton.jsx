/**
 * ============================================================================
 *  Generated/curated by Kavia AI -- Skeleton.jsx (UI loader)
 *  A simple reusable skeleton-loader for loading states in the UI.
 *  Fully linted and documented for developer usage. (Kavia AI)
 * ============================================================================
 */
import { cn } from "../../lib/utils"
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * Renders a rectangular skeleton UI for loading states.
 * @param {string} className - Additional CSS classes for styling
 * @param {any} props - Additional DOM props
 * @returns Skeleton loader JSX element
 */
function Skeleton({
  className,
  ...props
}) {
  // Combines skeleton styles with any extra user-supplied classes
  return (<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />);
}

Skeleton.propTypes = {
  className: PropTypes.string,
};

export { Skeleton }
