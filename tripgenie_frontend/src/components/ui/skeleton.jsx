/**
 * Kavia AI Documentation:
 * Skeleton.jsx - Visual placeholder for loading UI states.
 * Displays an animated muted rectangle block.
 */
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

// PUBLIC_INTERFACE
function Skeleton({ className, ...props }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
  );
}

// PropTypes validation for Skeleton
Skeleton.propTypes = {
  className: PropTypes.string,
};

export { Skeleton }
