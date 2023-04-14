"use client";
import React, { useEffect, useState } from "react";
import Partition from "./Partition";
import { majorGenericScales } from "@/utils/genericScales";
import { majorOcarinaScales, minorOcarinaScales } from "@/utils/ocarinaScales";
import {
  formatFullNote,
  genericNoteToParamNote,
  Letter,
  Modifier,
  paramNoteToIndex,
} from "@/utils/genericNotes";
import { twMerge as tm } from "tailwind-merge";
import { usePathname, useSearchParams } from "next/navigation";

type ScalePattern = "major" | "minor";
interface SearchParams {
  root?: `${Lowercase<Letter>}_${Lowercase<Modifier>}`;
  pattern?: ScalePattern;
  variants?: "0" | "1";
  all?: "0" | "1";
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const {
    root,
    pattern: patternParam,
    variants: variantsParam,
    all: allParam,
  } = searchParams;

  const clientSearchParams = useSearchParams();
  const pathname = usePathname();
  const [scaleRootIndex, setScaleRootIndex] = useState<number>(
    root ? paramNoteToIndex(root, majorGenericScales) : 0
  );
  const [scalePattern, setScalePattern] = useState<ScalePattern>(
    patternParam ?? "major"
  );
  const [showNoteVariants, setShowNoteVariants] = useState(
    variantsParam ? Boolean(parseInt(variantsParam)) : false
  );
  const [showAllNotes, setShowAllNotes] = useState(
    allParam ? Boolean(parseInt(allParam)) : false
  );
  const scale =
    scalePattern === "major"
      ? majorOcarinaScales[scaleRootIndex]
      : minorOcarinaScales[scaleRootIndex];

  useEffect(() => {
    const params = new URLSearchParams(clientSearchParams);

    params.set(
      "root",
      genericNoteToParamNote(majorGenericScales[scaleRootIndex].root)
    );
    params.set("pattern", scalePattern);
    params.set("variants", showNoteVariants ? "1" : "0");
    params.set("all", showAllNotes ? "1" : "0");

    window.history.pushState(undefined, "", `${pathname}?${params.toString()}`);
  }, [
    clientSearchParams,
    pathname,
    scalePattern,
    scaleRootIndex,
    showAllNotes,
    showNoteVariants,
  ]);

  return (
    <div className="flex flex-col gap-5 my-4">
      <span className="text-sm italic">learn your ocarina scales in style</span>
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
        <div className="flex gap-20">
          <div>
            <label className="flex items-center gap-4 mb-2 cursor-pointer">
              <input
                type="radio"
                className="radio radio-primary"
                checked={scalePattern === "major"}
                onChange={() => setScalePattern("major")}
              />
              <span className="select-none">major scale</span>
            </label>
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="radio"
                className="radio radio-primary"
                checked={scalePattern === "minor"}
                onChange={() => setScalePattern("minor")}
              />
              <span className="select-none">minor scale</span>
            </label>
          </div>
          <div>
            <label className="flex items-center gap-4 mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={showNoteVariants}
                onChange={() => setShowNoteVariants((p) => !p)}
              />
              <span className="select-none">show note variants</span>
            </label>
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={showAllNotes}
                onChange={() => setShowAllNotes((p) => !p)}
              />
              <span className="select-none">show all notes</span>
            </label>
          </div>
        </div>
      </section>
      <div className="border border-neutral opacity-30" />
      <section className="flex flex-col gap-8">
        {showAllNotes ? (
          <Partition
            partition={scale.prologue}
            showVariants={showNoteVariants}
            partitionName={"before the root note:"}
          />
        ) : null}
        <Partition
          partition={scale.core}
          showVariants={showNoteVariants}
          partitionName="core scale:"
        />
        {showAllNotes ? (
          <Partition
            partition={scale.epilogue}
            showVariants={showNoteVariants}
            partitionName={"after the first octave:"}
          />
        ) : null}
      </section>
    </div>
  );
}
