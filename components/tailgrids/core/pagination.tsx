
"use client";

import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowRight } from "@tailgrids/icons";
import { cva } from "class-variance-authority";
import { Button } from "./button";

const wrapperStyles = cva(
  "mx-auto flex w-full items-center justify-center max-sm:gap-5",
  {
    variants: {
      variant: {
        default: "gap-0.5",
        compact: "max-w-fit sm:divide-x sm:divide-button-outline-border"
      }
    }
  }
);

const sideButtonStyles = cva("max-sm:size-10 sm:h-10", {
  variants: {
    sideLayout: {
      full: "py-2 pr-4 pl-3.5",
      label: "px-4 py-2",
      icon: "p-2"
    },
    variant: {
      default: "",
      compact: ""
    }
  }
});

type PropsType = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  variant?: "default" | "compact";
  sideLayout?: "full" | "label" | "icon";
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "default",
  sideLayout = "full"
}: PropsType) {

  // สร้างเลขหน้าที่ต้องแสดง
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.add(i);
      }
    }

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const result: (number | "...")[] = [];

    sortedPages.forEach((page, index) => {
      if (index > 0 && page - sortedPages[index - 1] > 1) {
        result.push("...");
      }

      result.push(page);
    });

    return result;
  };

  const pageItems = getPages();

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="w-full text-sm font-medium text-text-50"
    >
      <ul className={wrapperStyles({ variant })}>

        {/* Previous */}
        <li className="mr-auto">
          <Button
            appearance="outline"
            size="sm"
            disabled={currentPage === 1}
            aria-label="Previous page"
            onClick={() => onPageChange?.(currentPage - 1)}
            className={cn(sideButtonStyles({ sideLayout, variant }), {
              "sm:rounded-r-none sm:border-r-0": variant === "compact"
            })}
          >
            <ArrowLeft
              className={cn("shrink-0", sideLayout === "label" && "sm:hidden")}
            />

            {sideLayout !== "icon" && (
              <span className="max-sm:hidden">Previous</span>
            )}
          </Button>
        </li>

        {/* Mobile */}
        <li className="sm:hidden">
          Page {currentPage} of {totalPages}
        </li>

        {/* Page Numbers */}
        {pageItems.map((item, index) => (
          <li key={index} className="max-sm:hidden">
            {item === "..." ? (
              <span className="flex size-10 items-center justify-center">
                ...
              </span>
            ) : (
              <PaginationButton
                page={item}
                isActive={currentPage === item}
                onPageChange={onPageChange}
                paginationVariant={variant}
              />
            )}
          </li>
        ))}

        {/* Next */}
        <li className="ml-auto">
          <Button
            size="sm"
            appearance="outline"
            disabled={currentPage === totalPages}
            aria-label="Next page"
            onClick={() => onPageChange?.(currentPage + 1)}
            className={cn(sideButtonStyles({ sideLayout, variant }), {
              "sm:rounded-l-none sm:border-l-0": variant === "compact"
            })}
          >
            {sideLayout !== "icon" && (
              <span className="max-sm:hidden">Next</span>
            )}

            <ArrowRight
              className={cn("shrink-0", sideLayout === "label" && "sm:hidden")}
            />
          </Button>
        </li>

      </ul>
    </nav>
  );
}

function PaginationButton({
  page,
  isActive,
  onPageChange,
  paginationVariant
}: {
  page: number;
  isActive: boolean;
  onPageChange?: (page: number) => void;
  paginationVariant: PropsType["variant"];
}) {
  return (
    <button
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "size-10 shrink-0 rounded-lg aria-[current=page]:bg-background-soft-100 hover:bg-background-soft-100",
        paginationVariant === "compact" &&
          "rounded-none border-y border-button-outline-border bg-button-outline-background"
      )}
      onClick={() => onPageChange?.(page)}
    >
      {page}
    </button>
  );
}
