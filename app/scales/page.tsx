"use client";
import React, { useState } from "react";
import Partition from "./Partition";
import { majorGenericScales } from "@/utils/genericScales";
import { majorOcarinaScales, minorOcarinaScales } from "@/utils/ocarinaScales";
import { formatFullNote } from "@/utils/genericNotes";
import { twMerge as tm } from "tailwind-merge";
/* import { usePathname, useRouter, useSearchParams } from "next/navigation"; */

type ScaleVariant = "major" | "minor";
export default function Home({
  searchParams,
}: {
  // TODO: rename these
  searchParams: { root?: `${number}`; variant?: ScaleVariant };
}) {
  const { root, variant } = searchParams;
  // TODO: update params to be readable

  /* const clientSearchParams = useSearchParams(); */
  /* const pathname = usePathname(); */
  /* const router = useRouter(); */
  const [scaleRootIndex, setScaleRootIndex] = useState<number>(
    root ? parseInt(root) : 0
  );
  const [scaleVariant, setScaleVariant] = useState<ScaleVariant>(
    variant ?? "major"
  );
  const [showNoteVariants, setShowNoteVariants] = useState(false);
  const scale =
    scaleVariant === "major"
      ? majorOcarinaScales[scaleRootIndex]
      : minorOcarinaScales[scaleRootIndex];

  /* useEffect(() => { */
  /*   const params = new URLSearchParams(clientSearchParams); */
  /**/
  /*   params.set("root", scaleRootIndex.toString()); */
  /*   params.set("variant", scaleVariant); */
  /*   router.push(`${pathname}?${params.toString()}`); */
  /* }, [scaleRootIndex, scaleVariant]); */

  return (
    <>
      <section className="flex flex-col gap-6">
        <div className="flex gap-2 flex-wrap">
          {majorGenericScales.map((scale, index) => {
            return (
              <button
                className={tm(
                  "btn btn-primary w-24",
                  scaleRootIndex !== index && "btn-outline"
                )}
                key={index}
                onClick={() => setScaleRootIndex(index)}
              >
                {formatFullNote(scale.root)}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 flex-wrap content-center">
          <button
            className={tm(
              "btn btn-primary",
              scaleVariant !== "major" && "btn-outline"
            )}
            onClick={() => setScaleVariant("major")}
          >
            Major
          </button>
          <button
            className={tm(
              "btn btn-primary",
              scaleVariant !== "minor" && "btn-outline"
            )}
            onClick={() => setScaleVariant("minor")}
          >
            Minor
          </button>
          <button
            className={tm(
              "btn btn-primary",
              !showNoteVariants && "btn-outline"
            )}
            onClick={() => setShowNoteVariants((prev) => !prev)}
          >
            Show Note Variants
          </button>
        </div>
      </section>
      <section className="py-5">
        <Partition
          partition={scale.prologue}
          showVariants={showNoteVariants}
          partitionName={"Before the root note"}
        />
        <Partition
          partition={scale.core}
          showVariants={showNoteVariants}
          partitionName={"Core scale"}
        />
        <Partition
          partition={scale.epilogue}
          showVariants={showNoteVariants}
          partitionName={"After the first octave"}
        />
      </section>
    </>
  );
}
