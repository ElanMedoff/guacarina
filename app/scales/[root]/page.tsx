"use client";

import React, { Fragment, useContext, useEffect } from "react";
import Partition from "@/app/scales/[root]/Partition";
import { majorGenericScales, minorGenericScales } from "@/utils/genericScales";
import { majorOcarinaScales, minorOcarinaScales } from "@/utils/ocarinaScales";
import {
  formatFullNote,
  genericNoteToParamNote,
  ParamNote,
  paramNoteToIndex,
} from "@/utils/genericNotes";
import { twMerge as tm } from "tailwind-merge";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Dialog, { useDialogControls } from "@/comps/Dialog";
import Swiper from "@/comps/Swiper";
import Ocarina from "@/app/scales/[root]/Ocarina";
import { MdZoomIn as ZoomIcon } from "react-icons/md";
import Border from "@/app/scales/[root]/Border";
import Link from "next/link";
import useFirstRender from "@/hooks/useFirstRender";
import DrawerContent from "@/app/scales/[root]/DrawerContent";
import { ControlsContext } from "@/app/scales/[root]/utils";

interface Params {
  root: ParamNote;
}

export default function Home({ params }: { params: Params }) {
  const {
    isOpen: isZoomOpen,
    close: closeZoom,
    show: showZoom,
  } = useDialogControls();
  const { root } = params;

  const clientSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const firstRender = useFirstRender();
  const controls = useContext(ControlsContext);
  const {
    scalePattern,
    setScalePattern,
    setShowAllNotes,
    setShowNoteVariants,
    showAllNotes,
    showNoteVariants,
  } = controls!;

  const scaleRootIndex = paramNoteToIndex(root, majorGenericScales);

  const scale =
    scalePattern === "major"
      ? majorOcarinaScales[scaleRootIndex]
      : minorOcarinaScales[scaleRootIndex];
  const genericScale =
    scalePattern === "major"
      ? majorGenericScales[scaleRootIndex]
      : minorGenericScales[scaleRootIndex];

  useEffect(() => {
    if (firstRender) return;

    const params = new URLSearchParams(clientSearchParams);

    params.set("pattern", scalePattern);
    params.set("variants", showNoteVariants ? "1" : "0");
    params.set("all", showAllNotes ? "1" : "0");

    router.push(`${pathname}?${params.toString()}`);
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
              <Link
                href={`/scales/${genericNoteToParamNote(scale.root)}`}
                className={tm(
                  "no-animation btn btn-primary w-[90px] text-3xl",
                  scaleRootIndex !== index && "btn-outline"
                )}
                key={index}
              >
                {formatFullNote({ note: scale.root })}
              </Link>
            );
          })}
        </div>
        <button onClick={() => showZoom()}>
          <ZoomIcon size={60} className="text-neutral" />
        </button>
      </section>
      <Border />
      <section className="block md:hidden">
        <DrawerContent
          scalePattern={scalePattern}
          setScalePattern={setScalePattern}
          setShowAllNotes={setShowAllNotes}
          setShowNoteVariants={setShowNoteVariants}
          showAllNotes={showAllNotes}
          showNoteVariants={showNoteVariants}
        />
      </section>
      <div className="block md:hidden">
        <Border />
      </div>
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
    </div>
  );
}
