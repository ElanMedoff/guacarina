import {
  formatFullNote,
  genericNoteToParamNote,
  ParamNote,
  paramNoteToIndex,
} from "@/utils/genericNotes";
import { majorGenericScales } from "@/utils/genericScales";
import { twMerge as tm } from "tailwind-merge";
import { SearchParams } from "@/app/scales/[root]/page";
import Link from "next/link";

export default function ScaleButtons({
  root,
  searchParams,
}: {
  root: ParamNote;
  searchParams: SearchParams;
}) {
  const scaleRootIndex = paramNoteToIndex(root, majorGenericScales);
  const searchParamsString = new URLSearchParams(
    searchParams as unknown as Record<string, string>
  ).toString();

  return (
    <div className="flex gap-2 flex-wrap">
      {majorGenericScales.map((scale, index) => {
        return (
          <Link
            href={`/scales/${genericNoteToParamNote(
              scale.root
            )}?${searchParamsString}`}
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
  );
}
