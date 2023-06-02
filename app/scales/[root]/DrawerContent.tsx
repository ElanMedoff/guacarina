import { Dispatch, SetStateAction } from "react";
import { ScalePattern } from "../layout";
import Metronome from "./Metronome";
import Panel from "./Panel";

export default function DrawerContent({
  scalePattern,
  setScalePattern,
  showNoteVariants,
  setShowNoteVariants,
  showAllNotes,
  setShowAllNotes,
}: {
  scalePattern: ScalePattern;
  setScalePattern: Dispatch<SetStateAction<ScalePattern>>;
  showNoteVariants: boolean;
  setShowNoteVariants: Dispatch<SetStateAction<boolean>>;
  showAllNotes: boolean;
  setShowAllNotes: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Metronome />
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
  );
}
