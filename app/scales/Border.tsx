import { twMerge as tm } from "tailwind-merge";

export default function Border({ className }: { className?: string }) {
  return <div className={tm("border border-neutral opacity-30", className)} />;
}
