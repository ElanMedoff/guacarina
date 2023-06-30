"use client";

import React, { Fragment, useContext } from "react";
import Partition from "@/app/scales/[scale]/Partition";
import { majorGenericScales, minorGenericScales } from "@/utils/genericScales";
import { majorOcarinaScales, minorOcarinaScales } from "@/utils/ocarinaScales";
import {
  formatFullNote,
  generateScaleParams,
  Param,
  paramToIndex,
  paramToScaleInfo,
} from "@/utils/genericNotes";
import Dialog, { useDialogControls } from "@/comps/Dialog";
import Swiper from "@/comps/Swiper";
import Ocarina from "@/app/scales/[scale]/Ocarina";
import { MdZoomIn as ZoomIcon } from "react-icons/md";
import Border from "@/app/scales/[scale]/Border";
import DrawerContent from "@/app/scales/[scale]/DrawerContent";
import { ControlsContext } from "@/app/scales/[scale]/utils";
import ScaleButtons from "@/app/scales/[scale]/ScaleButtons";
import { notFound } from "next/navigation";

interface Params {
  scale: Param;
}

export async function generateStaticParams() {
  return generateScaleParams().map((scaleParam) => {
    return {
      scale: scaleParam,
    };
  });
}

export default function Page({ params }: { params: Params }) {
  const {
    isOpen: isZoomOpen,
    close: closeZoom,
    show: showZoom,
  } = useDialogControls();
  const { scale: param } = params;

  const controls = useContext(ControlsContext);

  if (!generateScaleParams().includes(param)) {
    return notFound();
  }

  const { showAllNotes, showNoteVariants } = controls!;
  const { scalePattern } = paramToScaleInfo(param);
  const scaleRootIndex = paramToIndex(param, majorGenericScales);

  const scale =
    scalePattern === "major"
      ? majorOcarinaScales[scaleRootIndex]
      : minorOcarinaScales[scaleRootIndex];
  const genericScale =
    scalePattern === "major"
      ? majorGenericScales[scaleRootIndex]
      : minorGenericScales[scaleRootIndex];

  return (
    <div className="flex flex-col gap-6 pt-4 pb-16 overflow-hidden">
      <p className="italic text-lg">select an ocarina scale to get started!</p>
      <section className="flex gap-4 justify-between w-full flex-wrap">
        <ScaleButtons param={param} />
        <button onClick={() => showZoom()}>
          <ZoomIcon size={60} className="text-neutral" />
        </button>
      </section>
      <Border />
      <section className="block md:hidden">
        <DrawerContent />
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
