import {
  getNextNoteInScale,
  majorGenericScales,
  minorGenericScales,
  Scale,
} from "@/utils/genericScales";
import { OcarinaNote, ocarinaNotes } from "@/utils/ocarinaNotes";
import { areNotesEqual, Note } from "@/utils/genericNotes";

export interface OcarinaScale {
  prologue: OcarinaNote[];
  core: OcarinaNote[];
  epilogue: OcarinaNote[];
}

const isOcarinaNoteInScale = (ocarinaNote: OcarinaNote, scale: Scale) => {
  return scale.notes.some((note) => areNotesEqual(note, ocarinaNote.note));
};

// can't be undefined
const getRootOcarinaNote = (root: Note) => {
  return ocarinaNotes.find((ocarinaNote) =>
    areNotesEqual(root, ocarinaNote.note)
  )!;
};

// can be undefined
const getRootOctiveOcarinaNote = (root: Note) => {
  const rootOcarinaNote = getRootOcarinaNote(root);
  return ocarinaNotes.find((currOcarinaNote) => {
    return (
      areNotesEqual(root, currOcarinaNote.note) &&
      currOcarinaNote.index > rootOcarinaNote.index
    );
  });
};

const generatePrologue = (scale: Scale) => {
  const rootOcarinaNote = getRootOcarinaNote(scale.root);
  return ocarinaNotes
    .filter((currOcarinaNote) => currOcarinaNote.index < rootOcarinaNote.index)
    .filter((currOcarinaNote) => isOcarinaNoteInScale(currOcarinaNote, scale));
};

const generateBasicCore = (scale: Scale): OcarinaNote[] => {
  const rootOcarinaNote = getRootOcarinaNote(scale.root);
  const rootOctiveOcarinaNote = getRootOctiveOcarinaNote(scale.root);

  return ocarinaNotes
    .filter((currOcarinaNote) => {
      if (currOcarinaNote.index < rootOcarinaNote.index) return false;
      if (rootOctiveOcarinaNote === undefined) return true;
      if (currOcarinaNote.index > rootOctiveOcarinaNote.index) return false;
      return true;
    })
    .filter((currOcarinaNote) => isOcarinaNoteInScale(currOcarinaNote, scale));
};

const generateCore = (scale: Scale): OcarinaNote[] => {
  const rootOcarinaNote = getRootOcarinaNote(scale.root);
  const rootOctiveOcarinaNote = getRootOctiveOcarinaNote(scale.root);

  let core = generateBasicCore(scale);

  if (rootOctiveOcarinaNote === undefined) {
    const lastNote = core.at(-1)!;

    let currNote = lastNote;
    while (currNote.index !== rootOcarinaNote.index) {
      const nextNote = getNextNoteInScale(currNote.note, scale);
      const nextOcarinaNote = ocarinaNotes.find((ocarinaNote) =>
        areNotesEqual(ocarinaNote.note, nextNote)
      )!;
      core.push(nextOcarinaNote);
      currNote = nextOcarinaNote;
    }
  }

  return core;
};

const generateEpilogue = (scale: Scale) => {
  const rootOctiveOcarinaNote = getRootOctiveOcarinaNote(scale.root);

  if (rootOctiveOcarinaNote === undefined) return [];

  return ocarinaNotes
    .filter(
      (currOcarinaNote) => currOcarinaNote.index > rootOctiveOcarinaNote.index
    )
    .filter((currOcarinaNote) => isOcarinaNoteInScale(currOcarinaNote, scale));
};

const generateOcarinaScale = (genericScale: Scale): OcarinaScale => {
  return {
    prologue: generatePrologue(genericScale),
    core: generateCore(genericScale),
    epilogue: generateEpilogue(genericScale),
  };
};

const generateOcarinaScales = (genericScales: Scale[]) => {
  return genericScales.map((genericScale) =>
    generateOcarinaScale(genericScale)
  );
};

const majorOcarinaScales = generateOcarinaScales(majorGenericScales);
const minorOcarinaScales = generateOcarinaScales(minorGenericScales);

export { majorOcarinaScales, minorOcarinaScales };
