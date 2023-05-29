import { areNotesEqual, Note, notes } from "@/utils/genericNotes";

export interface Scale {
  root: Note;
  notes: Note[];
}

export const majorPattern = [0, 2, 4, 5, 7, 9, 11, 12] as const;
export const minorPattern = [0, 2, 3, 5, 7, 8, 10, 12] as const;

const generateScales = (
  pattern: typeof majorPattern | typeof minorPattern
): Scale[] => {
  return notes.map((note, rootIndex) => {
    return {
      root: note,
      notes: pattern.map((step) => notes[(rootIndex + step) % notes.length]),
    };
  });
};

export const majorGenericScales = generateScales(majorPattern);
export const minorGenericScales = generateScales(minorPattern);

export function getNextNoteInScale(currNote: Note, scale: Scale) {
  const currIndex = scale.notes.findIndex((note) =>
    areNotesEqual(currNote, note)
  );
  return scale.notes[(currIndex + 1) % scale.notes.length];
}
