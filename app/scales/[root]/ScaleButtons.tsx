import {
  formatFullNote,
  Param,
  paramToIndex,
  paramToScaleInfo,
  scaleInfoToParam,
} from "@/utils/genericNotes";
import { majorGenericScales } from "@/utils/genericScales";
import { twMerge as tm } from "tailwind-merge";
import Link from "next/link";

export default function ScaleButtons({ param }: { param: Param }) {
  const scaleRootIndex = paramToIndex(param, majorGenericScales);
  const { scalePattern } = paramToScaleInfo(param);

  return (
    <div className="flex gap-2 flex-wrap">
      {majorGenericScales.map((scale, index) => {
        return (
          <Link
            href={`/scales/${scaleInfoToParam(scale.root, scalePattern)}`}
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
