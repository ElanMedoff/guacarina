import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <main className="pt-20 min-h-[calc(100vh_-_55px)] px-10">{children}</main>
  );
}