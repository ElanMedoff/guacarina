"use client";

import { useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "@/utils/styleHelpers";
import { Chango } from "next/font/google";
import avocado from "@/app/avocado.png";
import Image from "next/image";

const font = Chango({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Header() {
  const [scrollDir, setScrollDir] = useState<"down" | "up">("up");

  // https://stackoverflow.com/a/62497293
  useEffect(() => {
    const threshold = 20;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <nav
      className={tm(
        "fixed left-0 z-2 py-3 border-b-2 border-neutral bg-base-100 w-full",
        scrollDir === "up" ? "top-0" : "top-[-100px]"
      )}
      style={{
        ...transitionProperties,
        transitionProperty: "top",
      }}
    >
      <div className="md:mx-10 flex items-center gap-3 justify-center md:justify-start">
        <Image src={avocado} alt="avocado ocarina" width={30} />
        <h1 className={tm("text-4xl text-neutral select-none", font.className)}>
          guacarina
        </h1>
      </div>
    </nav>
  );
}
