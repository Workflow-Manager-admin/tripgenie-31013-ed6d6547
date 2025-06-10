/**
 * ============================================================================
 *  Generated/curated by Kavia AI: UI Table Components Collection (table.jsx)
 *  Provides accessible, fully documented React table primitives for the design system.
 *  Each UI primitive is PropTypes-annotated and supports ref forwarding.
 * ============================================================================
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

/**
 * Table components (Kavia AI badged, see top)
 * Each element is exported and documented for design system compliance.
 */

// PUBLIC_INTERFACE
/**
 * Renders a responsive table shell with horizontal scrolling for overflow.
 * @param {string} className - Additional classnames.
 * @param {object} props - DOM attributes for the <table>.
 */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";
Table.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableHeader - wraps the column headings of a table.
 */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";
TableHeader.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableBody - table body wrapper node.
 */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";
TableBody.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableFooter - renders the table's footer row(s).
 */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";
TableFooter.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableRow - renders a <tr> with selectable/interactable states for UX.
 */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";
TableRow.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableHead - renders a <th> element for table headings.
 */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
TableHead.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableCell - a standard table data cell (<td>).
 */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";
TableCell.propTypes = { className: PropTypes.string };

// PUBLIC_INTERFACE
/**
 * TableCaption - optional caption/summary for the table, rendered as <caption>.
 */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
TableCaption.propTypes = { className: PropTypes.string };

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
