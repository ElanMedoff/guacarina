import {
  majorGenericScales,
  minorGenericScales,
  Scale,
} from "@/utils/genericScales";
import { OcarinaNote, ocarinaNotes } from "@/utils/ocarinaNotes";
import { areNotesEqual, GenericNote } from "@/utils/genericNotes";

export interface OcarinaScale {
  prologue: OcarinaNote[];
  core: OcarinaNote[];
  epilogue: OcarinaNote[];
}

const isOcarinaNoteInScale = (ocarinaNote: OcarinaNote, scale: Scale) => {
  return scale.notes.some((note) => areNotesEqual(note, ocarinaNote.note));
};

// can't be -1
const getRootIndex = (root: GenericNote) => {
  return ocarinaNotes.findIndex((ocarinaNote) =>
    areNotesEqual(root, ocarinaNote.note)
  );
};

// can be -1
const getRootOctiveIndex = (root: GenericNote) => {
  const rootIndex = getRootIndex(root);
  return ocarinaNotes.findIndex((currOcarinaNote, currOcarinaNoteIndex) => {
    return (
      areNotesEqual(root, currOcarinaNote.note) &&
      currOcarinaNoteIndex > rootIndex
    );
  });
};

const generatePrologue = (scale: Scale) => {
  const rootIndex = getRootIndex(scale.root);
  // TODO: way to do this without using currOcarinaNoteIndex?
  return ocarinaNotes
    .filter((_, currOcarinaNoteIndex) => currOcarinaNoteIndex < rootIndex)
    .filter((currOcarinaNote) => isOcarinaNoteInScale(currOcarinaNote, scale));
};

const generateCore = (scale: Scale): OcarinaNote[] => {
  const rootIndex = getRootIndex(scale.root);
  const rootOctiveIndex = getRootOctiveIndex(scale.root);

  return ocarinaNotes
    .filter((_, currOcarinaNoteIndex) => {
      if (currOcarinaNoteIndex < rootIndex) return false;
      if (currOcarinaNoteIndex > rootOctiveIndex) {
        if (rootOctiveIndex === -1) return true;
        return false;
      }
      return true;
    })
    .filter((currOcarinaNote) => isOcarinaNoteInScale(currOcarinaNote, scale));
};

const generateEpilogue = (scale: Scale) => {
  const rootOctiveIndex = getRootOctiveIndex(scale.root);

  if (rootOctiveIndex === -1) return [];

  return ocarinaNotes
    .filter((_, currOcarinaNoteIndex) => currOcarinaNoteIndex > rootOctiveIndex)
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
