"use client";

import { cn } from "@/lib/utils";

interface TableProps {
  children: React.ReactNode;
}

interface TableHeaderProps {
  children: React.ReactNode;
}

interface TableBodyProps {
  children: React.ReactNode;
}

interface TableRowProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

export function MDXTable({ children }: TableProps) {
  return (
    <div className="overflow-x-auto my-4 rounded-md border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function MDXTableHead({ children }: TableHeaderProps) {
  return (
    <thead className="border-b border-border bg-muted/50">{children}</thead>
  );
}

export function MDXTableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}

export function MDXTableRow({ children, isHeader }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-border",
        !isHeader &&
          "hover:bg-muted/60 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
      )}
    >
      {children}
    </tr>
  );
}

export function MDXTableCell({ children, isHeader }: TableCellProps) {
  return (
    <td
      className={cn(
        "px-3 py-3",
        isHeader
          ? "font-semibold text-foreground text-xs uppercase tracking-wider"
          : "text-muted-foreground",
      )}
    >
      {children}
    </td>
  );
}
