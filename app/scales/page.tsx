"use client";
import React, { useState } from "react";
import Partition from "./Partition";
import { majorGenericScales } from "@/utils/genericScales";
import { majorOcarinaScales, minorOcarinaScales } from "@/utils/ocarinaScales";
import {
  formatFullNote,
  /* genericNoteToParamNote, */
  Letter,
  Modifier,
  paramNoteToIndex,
} from "@/utils/genericNotes";
import { twMerge as tm } from "tailwind-merge";
/* import { usePathname, useRouter, useSearchParams } from "next/navigation"; */
/* import { isExisty } from "@/utils/helpers"; */

type ScalePattern = "major" | "minor";
export default function Home({
  searchParams,
}: {
  searchParams: {
    root?: `${Lowercase<Letter>}_${Lowercase<Modifier>}`;
    scalePattern?: ScalePattern;
    showNoteVariants?: `${boolean}`;
  };
}) {
  const {
    root,
    scalePattern: scalePatternParam,
    showNoteVariants: showNoteVariantsParam,
  } = searchParams;

  /* const clientSearchParams = useSearchParams(); */
  /* const pathname = usePathname(); */
  /* const router = useRouter(); */
  const [scaleRootIndex, setScaleRootIndex] = useState<number>(
    root ? paramNoteToIndex(root, majorGenericScales) : 0
  );
  const [scalePattern, setScalePattern] = useState<ScalePattern>(
    scalePatternParam ?? "major"
  );
  const [showNoteVariants, setShowNoteVariants] = useState(
    Boolean(showNoteVariantsParam)
  );
  const scale =
    scalePattern === "major"
      ? majorOcarinaScales[scaleRootIndex]
      : minorOcarinaScales[scaleRootIndex];

  const setState = ({
    scaleRootIndex,
    scalePattern,
    showNoteVariants,
  }: {
    scaleRootIndex?: number;
    scalePattern?: ScalePattern;
    showNoteVariants?: boolean;
  }) => {
    if (scaleRootIndex !== undefined) setScaleRootIndex(scaleRootIndex);
    if (scalePattern !== undefined) setScalePattern(scalePattern);
    if (showNoteVariants !== undefined) setShowNoteVariants(showNoteVariants);
    /* const params = new URLSearchParams(clientSearchParams); */
    /**/
    /* if (isExisty(scaleRootIndex)) { */
    /*   params.set( */
    /*     "root", */
    /*     genericNoteToParamNote(majorGenericScales[scaleRootIndex].root) */
    /*   ); */
    /* } */
    /* if (scalePattern) { */
    /*   params.set("scalePattern", scalePattern); */
    /* } */
    /* if (isExisty(showNoteVariants)) { */
    /*   params.set("showNoteVariants", showNoteVariants.toString()); */
    /* } */
    /* router.push(`${pathname}?${params.toString()}`, { */
    /*   forceOptimisticNavigation: true, */
    /* }); */
  };

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
                onClick={() => setState({ scaleRootIndex: index })}
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
              scalePattern !== "major" && "btn-outline"
            )}
            onClick={() => setState({ scalePattern: "major" })}
          >
            Major
          </button>
          <button
            className={tm(
              "btn btn-primary",
              scalePattern !== "minor" && "btn-outline"
            )}
            onClick={() => setState({ scalePattern: "minor" })}
          >
            Minor
          </button>
          <button
            className={tm(
              "btn btn-primary",
              !showNoteVariants && "btn-outline"
            )}
            onClick={() => setState({ showNoteVariants: !showNoteVariants })}
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
