"use client";
import React, { useState, useEffect } from "react";
import Partition from "./Partition";
import { majorGenericScales } from "@/utils/genericScales";
import { majorOcarinaScales, minorOcarinaScales } from "@/utils/ocarinaScales";
import { prettifyModifier } from "@/utils/genericNotes";

export default function Home() {
  const [scale, setScale] = useState(majorOcarinaScales[0]);
  const [scaleRootIndex, setScaleRootIndex] = useState<number>(0);
  const [scaleVariant, setScaleVariant] = useState<"MAJOR" | "MINOR">("MAJOR");
  const [showNoteVariants, setShowNoteVariants] = useState(false);

  useEffect(() => {
    if (scaleVariant === "MAJOR") {
      setScale(majorOcarinaScales[scaleRootIndex]);
      return;
    }

    if (scaleVariant === "MINOR") {
      setScale(minorOcarinaScales[scaleRootIndex]);
      return;
    }

    return;
  }, [scaleRootIndex, scaleVariant]);

  const renderPartitions = () => {
    return (
      <>
        {
          <Partition
            partition={scale.prologue}
            showVariants={showNoteVariants}
            partitionName={"Prologue"}
          />
        }
        {
          <Partition
            partition={scale.core}
            showVariants={showNoteVariants}
            partitionName={"Core"}
          />
        }
        {
          <Partition
            partition={scale.epilogue}
            showVariants={showNoteVariants}
            partitionName={"Epilogue"}
          />
        }
      </>
    );
  };

  return (
    <>
      <div className={"px-10"}>
        <section className={"flex gap-10"}>
          <div className={"flex gap-2 flex-wrap justify-center"}>
            {majorGenericScales.map((scale, index) => {
              return (
                <button
                  className={
                    "btn btn-primary w-16"
                    /* { */
                    /*   "btn-outline": scaleRootIndex !== index, */
                    /* }) */
                  }
                  key={index}
                  onClick={() => setScaleRootIndex(index)}
                >
                  {scale.root.letter}
                  {scale.root.modifier && prettifyModifier(scale.root)}
                </button>
              );
            })}
          </div>
          <div className={"ml-auto flex gap-2 flex-wrap content-center"}>
            <button
              className={
                "btn btn-primary"
                /* { */
                /*   "btn-outline": scaleVariant !== "MAJOR", */
                /* }) */
              }
              onClick={() => setScaleVariant("MAJOR")}
            >
              Major
            </button>
            <button
              className={
                "btn btn-primary"
                /*   { */
                /*   "btn-outline": scaleVariant !== "MINOR", */
                /* } */
              }
              onClick={() => setScaleVariant("MINOR")}
            >
              Minor
            </button>
            <button
              className={
                "btn btn-primary"
                /*   { */
                /*   "btn-outline": !showNoteVariants, */
                /* } */
              }
              onClick={() => setShowNoteVariants((prev) => !prev)}
            >
              Show Note Variants
            </button>
          </div>
        </section>
      </div>
      <section>{renderPartitions()}</section>
    </>
  );
}
