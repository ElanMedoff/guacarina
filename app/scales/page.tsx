"use client";

import React, { useEffect, useState } from "react";
import Partition from "@/app/scales/Partition";
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
import Ocarina from "@/app/scales/Ocarina";
import Metronome from "@/app/scales/Metronome";
import Panel from "@/app/scales/Panel";
import { isExisty } from "@/utils/helpers";
import { MdZoomIn as ZoomIcon } from "react-icons/md";

import Border from "./Border";
import Drawer from "./Drawer";

type ScalePattern = "major" | "minor";
interface SearchParams {
  root?: `${Lowercase<Letter>}_${Lowercase<Modifier>}`;
  pattern?: ScalePattern;
  variants?: "0" | "1";
  all?: "0" | "1";
  bpm: `${number}`;
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
    bpm: bpmParam,
  } = searchParams;

  const clientSearchParams = useSearchParams();
  const pathname = usePathname();
  const [bpm, setBpm] = useState(isExisty(bpmParam) ? parseInt(bpmParam) : 100);
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
    allParam ? Boolean(parseInt(allParam)) : true
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
    params.set("bpm", bpm.toString());

    window.history.pushState(undefined, "", `${pathname}?${params.toString()}`);
  }, [
    clientSearchParams,
    pathname,
    scalePattern,
    scaleRootIndex,
    showAllNotes,
    showNoteVariants,
    bpm,
  ]);

  return (
    <div className="flex flex-col gap-5 pt-4 pb-16">
      <Border className="sm:hidden" />
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
          <Metronome bpm={bpm} setBpm={setBpm} />
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
