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
    <div className="overflow-x-auto my-4 rounded-lg border border-border">
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
        !isHeader && "hover:bg-muted/30 transition-colors",
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
        "px-4 py-3",
        isHeader
          ? "font-semibold text-foreground text-xs uppercase tracking-wider"
          : "text-muted-foreground",
      )}
    >
      {children}
    </td>
  );
}
