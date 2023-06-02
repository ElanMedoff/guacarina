"use client";

import { ReactNode, useState } from "react";
import Drawer from "@/app/scales/[root]/Drawer";
import { useSearchParams } from "next/navigation";
import DrawerContent from "@/app/scales/[root]/DrawerContent";
import { ControlsContext } from "@/app/scales/[root]/utils";

export type ScalePattern = "major" | "minor";
function useControls() {
  const searchParams = useSearchParams();
  const patternParam = searchParams.get("pattern") as ScalePattern | null;
  const variantsParam = searchParams.get("variants");
  const allParam = searchParams.get("all");

  const [scalePattern, setScalePattern] = useState<ScalePattern>(
    patternParam ?? "major"
  );
  const [showNoteVariants, setShowNoteVariants] = useState(
    variantsParam ? Boolean(parseInt(variantsParam)) : false
  );
  const [showAllNotes, setShowAllNotes] = useState(
    allParam ? Boolean(parseInt(allParam)) : false
  );

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
  const {
    scalePattern,
    setScalePattern,
    setShowAllNotes,
    setShowNoteVariants,
    showAllNotes,
    showNoteVariants,
  } = controls;

  return (
    <ControlsContext.Provider value={controls}>
      {children}
      <Drawer>
        <DrawerContent
          scalePattern={scalePattern}
          setScalePattern={setScalePattern}
          setShowAllNotes={setShowAllNotes}
          setShowNoteVariants={setShowNoteVariants}
          showAllNotes={showAllNotes}
          showNoteVariants={showNoteVariants}
        />
      </Drawer>
    </ControlsContext.Provider>
  );
}
