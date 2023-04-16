import { ReactNode } from "react";

export default function Control({ children }: { children: ReactNode }) {
  return (
    <article className="border-2 border-base-300 w-max p-4 rounded-md h-min">
      {children}
    </article>
  );
}
