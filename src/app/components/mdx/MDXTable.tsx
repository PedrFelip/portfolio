"use client";

import { memo } from "react";
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

export const MDXTable = memo(function MDXTable({ children }: TableProps) {
  return (
    <div className="my-7 overflow-x-auto rounded-sm border border-border/60">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
});

export const MDXTableHead = memo(function MDXTableHead({
  children,
}: TableHeaderProps) {
  return (
    <thead className="border-b border-border bg-muted/30">{children}</thead>
  );
});

export const MDXTableBody = memo(function MDXTableBody({
  children,
}: TableBodyProps) {
  return <tbody>{children}</tbody>;
});

export const MDXTableRow = memo(function MDXTableRow({
  children,
  isHeader,
}: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-border/60 last:border-b-0",
        !isHeader &&
          "transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-surface-2",
      )}
    >
      {children}
    </tr>
  );
});

export const MDXTableCell = memo(function MDXTableCell({
  children,
  isHeader,
}: TableCellProps) {
  return (
    <td
      className={cn(
        "px-3 py-2.5 sm:px-4 sm:py-3",
        isHeader
          ? "text-[11px] font-medium uppercase tracking-wide text-foreground"
          : "text-muted-foreground",
      )}
    >
      {children}
    </td>
  );
});
