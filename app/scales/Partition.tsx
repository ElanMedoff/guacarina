import React from "react";
import { OcarinaNote } from "@/utils/ocarinaNotes";
import Ocarina from "@/app/scales/Ocarina";
import { nanoid } from "nanoid";
import { formatFullNote } from "@/utils/genericNotes";

interface Props {
  partition: OcarinaNote[];
  showVariants: boolean;
}

export default function Partition({ partition, showVariants }: Props) {
  if (partition.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-4">
      {partition.map((ocarinaNote) => {
        return (
          <ul
            className="flex flex-col justify-start items-center"
            key={nanoid()}
          >
            <span className="text-lg">
              {formatFullNote({
                note: ocarinaNote.note,
                octave: ocarinaNote.octave,
              })}
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
  );
}
