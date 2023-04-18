import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <main className="pt-[75px] min-h-[calc(100vh_-_62px)] px-4 md:px-10">
      {children}
    </main>
  );
}
