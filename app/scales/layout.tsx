"use client";

import { ReactNode, useState } from "react";
import Drawer from "@/app/scales/[scale]/Drawer";
import DrawerContent from "@/app/scales/[scale]/DrawerContent";
import { ControlsContext } from "@/app/scales/[scale]/utils";
import { ScalePattern } from "@/utils/genericNotes";

function useControls() {
  const [scalePattern, setScalePattern] = useState<ScalePattern>("major");
  const [showNoteVariants, setShowNoteVariants] = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);

  return {
    scalePattern,
    setScalePattern,
    showNoteVariants,
    setShowNoteVariants,
    showAllNotes,
    setShowAllNotes,
  };
}

// move drawer to the layout so it doesn't rerender on navigations between scales
// page.tsx needs access to the same props, so move it to context
export default function Layout({ children }: { children: ReactNode }) {
  const controls = useControls();

  return (
    <ControlsContext.Provider value={controls}>
      {children}
      <Drawer>
        <DrawerContent />
      </Drawer>
    </ControlsContext.Provider>
  );
}
