"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import { transitionProperties } from "@/utils/styleHelpers";

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
        "fixed left-0 z-10 py-3 border-b-2 border-neutral bg-base-100 w-full",
        scrollDir === "up" ? "top-0" : "top-[-100px]"
      )}
      style={{
        ...transitionProperties,
        transitionProperty: "top",
      }}
    >
      <div className="flex justify-between items-center mx-14">
        <h3 className="text-4xl text-primary">
          <Link href="/">guacarina</Link>
        </h3>
        <span className="cursor-pointer select-none">
          <Link href="/scales">scales</Link>
        </span>
      </div>
    </nav>
  );
}
