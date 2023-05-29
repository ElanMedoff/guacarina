"use client";

import React, { Fragment, useEffect, useState } from "react";
import Partition from "@/app/scales/Partition";
import { majorGenericScales, minorGenericScales } from "@/utils/genericScales";
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
import Ocarina from "@/app/scales/Ocarina";
import Metronome from "@/app/scales/Metronome";
import Panel from "@/app/scales/Panel";
import { MdZoomIn as ZoomIcon } from "react-icons/md";

import Border from "./Border";
import Drawer from "./Drawer";

type ScalePattern = "major" | "minor";
interface SearchParams {
  root?: `${Lowercase<Letter>}_${Lowercase<Modifier>}`;
  pattern?: ScalePattern;
  variants?: "0" | "1";
  all?: "0" | "1";
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const {
    isOpen: isZoomOpen,
    close: closeZoom,
    show: showZoom,
  } = useDialogControls();
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
  const genericScale =
    scalePattern === "major"
      ? majorGenericScales[scaleRootIndex]
      : minorGenericScales[scaleRootIndex];

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
    <div className="flex flex-col gap-6 pt-4 pb-16 overflow-hidden">
      <p className="italic text-lg">select an ocarina scale to get started!</p>
      <section className="flex gap-4 justify-between w-full flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {majorGenericScales.map((scale, index) => {
            return (
              <button
                className={tm(
                  "btn btn-primary w-[90px] text-3xl",
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
        <button onClick={() => showZoom()}>
          <ZoomIcon size={60} className="text-neutral" />
        </button>
      </section>
      <Border />
      <section className="flex flex-col gap-12">
        <h3 className="text-5xl m-auto">
          {formatFullNote({
            note: genericScale.root,
          })}{" "}
          <span className="capitalize">{scalePattern}</span> Scale
        </h3>
        <div className="flex flex-col gap-8">
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
        </div>
        <div className="border-2 border-neutral rounded-lg m-auto p-4 text-lg text-center">
          <span className="font-semibold">
            The{" "}
            {formatFullNote({
              note: genericScale.root,
            })}{" "}
            <span className="capitalize">{scalePattern}</span> Scale{" "}
          </span>
          has the pattern:
          <p className="">
            {scalePattern === "major"
              ? "Whole - Whole -  Half - Whole - Whole - Whole - Half"
              : "Whole - Half - Whole - Whole - Half - Whole - Whole"}
          </p>
          with the notes{" "}
          {genericScale.notes.map((note, index) => {
            return (
              <Fragment key={index}>
                {formatFullNote({ note })}
                {index === genericScale.notes.length - 1 ? "" : ", "}
                {index === genericScale.notes.length - 2 && "and "}
              </Fragment>
            );
          })}
        </div>
      </section>
      <Dialog isOpen={isZoomOpen} onDismiss={closeZoom}>
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
      <Drawer>
        <div className="flex flex-col gap-6">
          <Metronome />
          <Panel>
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
          </Panel>
          <Panel>
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
          </Panel>
        </div>
      </Drawer>
    </div>
  );
}
