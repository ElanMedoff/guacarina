import { GenericNote, notes } from "@/utils/genericNotes";

export interface Scale {
  root: GenericNote;
  notes: GenericNote[];
}

const majorPattern = [0, 2, 4, 5, 7, 9, 11, 12] as const;
const minorPattern = [0, 2, 3, 5, 7, 8, 10, 12] as const;

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

const majorGenericScales = generateScales(majorPattern);
const minorGenericScales = generateScales(minorPattern);
export { majorGenericScales, minorGenericScales };
