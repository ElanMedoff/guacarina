import { ReactNode } from "react";
import { twMerge as tm } from "tailwind-merge";

export default function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={tm(
        "border-2 border-base-300 w-max p-4 rounded-md h-min",
        className
      )}
    >
      {children}
    </article>
  );
}
