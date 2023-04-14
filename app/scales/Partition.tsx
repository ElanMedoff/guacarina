import React from "react";
import { OcarinaNote } from "@/utils/ocarinaNotes";
import Ocarina from "./Ocarina";
import { nanoid } from "nanoid";
import { formatFullNote } from "@/utils/genericNotes";

interface Props {
  partition: OcarinaNote[];
  showVariants: boolean;
  partitionName: string;
}

export default function Partition({
  partition,
  showVariants,
  partitionName,
}: Props) {
  if (partition.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">{partitionName}</h3>
      <ul className="flex flex-wrap">
        {partition.map((ocarinaNote) => {
          return (
            <ul
              className="flex flex-col justify-start items-center"
              key={nanoid()}
            >
              <span className="text-lg">
                {formatFullNote(ocarinaNote.note)}
              </span>
              {showVariants ? (
                ocarinaNote.variants.map((variant) => (
                  <li className="w-28 h-28" key={nanoid()}>
                    <Ocarina configuration={variant} />
                  </li>
                ))
              ) : (
                <li className="w-28 h-28" key={nanoid()}>
                  <Ocarina configuration={ocarinaNote.variants[0]} />
                </li>
              )}
            </ul>
          );
        })}
      </ul>
    </div>
  );
}
