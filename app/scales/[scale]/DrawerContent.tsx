import {
  Param,
  paramToScaleInfo,
  scaleInfoToParam,
} from "@/utils/genericNotes";
import Link from "next/link";
import { useContext } from "react";
import Metronome from "@/app/scales/[scale]/Metronome";
import Panel from "@/app/scales/[scale]/Panel";
import { ControlsContext } from "@/app/scales/[scale]/utils";
import { useParams } from "next/navigation";

export default function DrawerContent() {
  const controls = useContext(ControlsContext);
  const {
    setShowAllNotes,
    setShowNoteVariants,
    showAllNotes,
    showNoteVariants,
  } = controls!;

  const { scale } = useParams();
  const { scalePattern, genericNote } = paramToScaleInfo(scale as Param);

  return (
    <div className="flex flex-col gap-6">
      <Metronome />
      <Panel>
        <label className="flex items-center gap-4 mb-2 cursor-pointer">
          <Link
            href={`/scales/${scaleInfoToParam(genericNote, "major")}`}
            className="flex flex-col justify-center"
          >
            <input
              type="radio"
              className="radio radio-primary"
              checked={scalePattern === "major"}
              readOnly
            />
          </Link>
          <span className="select-none">major scale</span>
        </label>
        <label className="flex items-center gap-4 cursor-pointer">
          <Link
            href={`/scales/${scaleInfoToParam(genericNote, "minor")}`}
            className="flex flex-col justify-center"
          >
            <input
              type="radio"
              className="radio radio-primary"
              checked={scalePattern === "minor"}
              readOnly
            />
          </Link>
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
  );
}
