import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <main className="p-4 md:px-10 mb-24">{children}</main>;
}
