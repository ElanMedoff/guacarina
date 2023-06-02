import { ScalePattern } from "@/app/scales/layout";
import { createContext, Dispatch, SetStateAction } from "react";

export const ControlsContext = createContext<{
  scalePattern: ScalePattern;
  setScalePattern: Dispatch<SetStateAction<ScalePattern>>;
  showNoteVariants: boolean;
  setShowNoteVariants: Dispatch<SetStateAction<boolean>>;
  showAllNotes: boolean;
  setShowAllNotes: Dispatch<SetStateAction<boolean>>;
} | null>(null);
