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
import Dialog, { useDialogControls } from "@/comps/Dialog";
import Swiper from "@/comps/Swiper";
import Ocarina from "./Ocarina";
import Metronome from "./Metronome";
import Control from "./Control";

type ScalePattern = "major" | "minor";
interface SearchParams {
  root?: `${Lowercase<Letter>}_${Lowercase<Modifier>}`;
  pattern?: ScalePattern;
  variants?: "0" | "1";
  all?: "0" | "1";
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const { isOpen, close, show } = useDialogControls();
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
      <section className="flex flex-col gap-6">
        <div className="sm:flex gap-2 flex-wrap hidden">
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
                {formatFullNote({ note: scale.root })}
              </button>
            );
          })}
        </div>
        <div className="dropdown sm:hidden">
          <label tabIndex={0} className="btn m-1">
            choose scale
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content border-2 border-base-300 menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {majorGenericScales.map((scale, index) => {
              return (
                <li key={index} onClick={() => setScaleRootIndex(index)}>
                  <a>{formatFullNote({ note: scale.root })}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Metronome />
          <Control>
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
          </Control>
          <Control>
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
          </Control>
          <button className="btn" onClick={() => show()}>
            open large view
          </button>
        </div>
      </section>
      <div className="border border-neutral opacity-30" />
      <section className="flex flex-col gap-8">
        {showAllNotes ? (
          <Partition
            partition={scale.prologue}
            showVariants={showNoteVariants}
          />
        ) : null}
        <Partition partition={scale.core} showVariants={showNoteVariants} />
        {showAllNotes ? (
          <Partition
            partition={scale.epilogue}
            showVariants={showNoteVariants}
          />
        ) : null}
      </section>
      <Dialog isOpen={isOpen} onDismiss={close}>
        <Swiper>
          {scale.core.map((ocarinaNote, index) => {
            return (
              <div key={index} className="w-[500px] flex flex-col items-center">
                <span className="text-6xl">
                  {formatFullNote({
                    note: ocarinaNote.note,
                    octave: ocarinaNote.octave,
                    octaveStyles: "text-4xl",
                  })}
                </span>
                <Ocarina configuration={ocarinaNote.variants[0]} />
              </div>
            );
          })}
        </Swiper>
      </Dialog>
    </div>
  );
}
