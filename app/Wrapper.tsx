import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[calc(100vh_-_77px_-_59px)] px-4 md:px-10">
      {children}
    </main>
  );
}
