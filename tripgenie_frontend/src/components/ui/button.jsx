import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./buttonVariants";
import PropTypes from "prop-types";

/**
 * Button (Kavia AI badged)
 * Button design system utility - adds PropTypes validation for lint compliance.
 */
// PUBLIC_INTERFACE
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  asChild: PropTypes.bool,
};

Button.displayName = "Button";

export { Button };
