export type Letter = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Modifier = "SHARP" | "FLAT";

export interface GenericNote {
  letter: Letter;
  modifier?: Modifier;
}

interface SharpNote extends GenericNote {
  modifier?: "SHARP";
}

export const notes: SharpNote[] = [
  { letter: "C" },
  { letter: "C", modifier: "SHARP" },
  { letter: "D" },
  { letter: "D", modifier: "SHARP" },
  { letter: "E" },
  { letter: "F" },
  { letter: "F", modifier: "SHARP" },
  { letter: "G" },
  { letter: "G", modifier: "SHARP" },
  { letter: "A" },
  { letter: "A", modifier: "SHARP" },
  { letter: "B" },
];

export function sharpToFlat(note: GenericNote): GenericNote {
  if (!note.modifier) return note;

  if (note.modifier === "FLAT") return note;

  if (note.letter === "E") {
    return { letter: "F" };
  }

  if (note.letter === "B") {
    return { letter: "C" };
  }

  const noteIndex = notes.findIndex(({ letter }) => letter === note.letter);

  if (noteIndex === -1) {
    throw new Error(
      `Couldn't find ${note.letter}${note.modifier} in the notes array!`
    );
  }

  return {
    letter: notes[(noteIndex + 2) % notes.length].letter,
    modifier: "FLAT",
  };
}

export function flatToSharp(note: GenericNote): GenericNote {
  if (!note.modifier) return note;

  if (note.modifier === "SHARP") return note;

  if (note.letter === "C") {
    return { letter: "B" };
  }

  if (note.letter === "F") {
    return { letter: "E" };
  }

  const noteIndex = notes.findIndex(({ letter }) => letter === note.letter);

  if (noteIndex === -1) {
    throw new Error(
      `Couldn't find ${note.letter}${note.modifier} in the notes array!`
    );
  }

  return {
    letter: notes[(noteIndex - 2) % notes.length].letter,
    modifier: "SHARP",
  };
}

export function areNotesEqual(note1: GenericNote, note2: GenericNote) {
  note1 = flatToSharp(note1);
  note2 = flatToSharp(note2);
  if (note1.letter !== note2.letter) return false;

  if (
    (note1.modifier && !note2.modifier) ||
    (!note1.modifier && note2.modifier)
  ) {
    return false;
  }

  return true;
}

export function prettifyModifier(note: GenericNote) {
  if (!note.modifier) return "";
  return note.modifier === "SHARP" ? "#" : "♭";
}

export function formatFullNote(note: GenericNote) {
  if (!note.modifier) return note.letter;

  const sharp = flatToSharp(note);
  const flat = sharpToFlat(note);

  return `${sharp.letter}${prettifyModifier(sharp)} / ${
    flat.letter
  }${prettifyModifier(flat)}`;
}
