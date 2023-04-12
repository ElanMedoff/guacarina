import React from "react";
import { OcarinaNote } from "@/utils/ocarinaNotes";
import Ocarina from "./Ocarina";
import { nanoid } from "nanoid";

interface Props {
  partition: OcarinaNote[];
  showVariants: boolean;
  partitionName: "Prologue" | "Core" | "Epilogue" | null;
}

export default function Partition({
  partition,
  showVariants,
  partitionName,
}: Props) {
  const renderTitleAndDivider = () => {
    return (
      <>
        {partitionName ? (
          <>
            <h2 className="text-xl -mb-2">{partitionName}</h2>
            <div className="divider opacity-20" />
          </>
        ) : null}
      </>
    );
  };

  if (partition.length === 0) return null;

  return (
    <div className="py-5">
      {renderTitleAndDivider()}
      <ul className={"flex"}>
        {partition.map((ocarinaNote) => {
          return (
            <ul className={"flex flex-col"} key={nanoid()}>
              {showVariants ? (
                ocarinaNote.variants.map((variant) => (
                  <li className={"w-28 h-28"} key={nanoid()}>
                    <Ocarina configuration={variant} />
                  </li>
                ))
              ) : (
                <li className={"w-28 h-28"} key={nanoid()}>
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
