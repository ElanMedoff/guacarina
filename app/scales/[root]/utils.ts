import { createContext, Dispatch, SetStateAction } from "react";

export const ControlsContext = createContext<{
  showNoteVariants: boolean;
  setShowNoteVariants: Dispatch<SetStateAction<boolean>>;
  showAllNotes: boolean;
  setShowAllNotes: Dispatch<SetStateAction<boolean>>;
} | null>(null);
