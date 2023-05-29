import { twMerge as tm } from "tailwind-merge";
import { Chango } from "next/font/google";
import avocado from "@/app/avocado.png";
import Image from "next/image";

const font = Chango({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Header() {
  return (
    <nav className="border-b-2 py-3 border-neutral bg-base-100 w-full">
      <div className="md:mx-10 flex items-center gap-3 justify-center md:justify-start">
        <Image src={avocado} alt="avocado ocarina" width={30} />
        <h1 className={tm("text-5xl text-neutral select-none", font.className)}>
          guacarina
        </h1>
      </div>
    </nav>
  );
}
