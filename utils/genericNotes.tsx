import { Scale } from "./genericScales";
import { isExisty, toLowerCase } from "./helpers";
import { OcarinaNote } from "./ocarinaNotes";

export type Letter = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export type Modifier = "SHARP" | "FLAT";

export interface Note {
  letter: Letter;
  modifier?: Modifier;
}

interface SharpNote extends Note {
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

export function sharpToFlat(note: Note): Note {
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

export function flatToSharp(note: Note): Note {
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

export function areNotesEqual(note1: Note, note2: Note) {
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

export function prettifyModifier(note: Note) {
  if (!note.modifier) return "";
  return note.modifier === "SHARP" ? "#" : "♭";
}

export function formatFullNote({
  note,
  octave,
  octaveStyles = "text-sm",
}: {
  note: Note;
  octave?: number;
  octaveStyles?: string;
}) {
  const renderOctave = () => {
    return (
      <>
        {isExisty(octave) ? (
          <span className={octaveStyles}>{octave + 4}</span>
        ) : (
          ""
        )}
      </>
    );
  };
  if (!note.modifier)
    return (
      <>
        {note.letter}
        {renderOctave()}
      </>
    );

  const sharp = flatToSharp(note);
  const flat = sharpToFlat(note);

  if (
    areNotesEqual(flat, { letter: "E", modifier: "FLAT" }) ||
    areNotesEqual(flat, { letter: "B", modifier: "FLAT" })
  ) {
    return (
      <>
        {flat.letter}
        {prettifyModifier(flat)}
        {renderOctave()}
      </>
    );
  }

  return (
    <>
      {sharp.letter}
      {prettifyModifier(sharp)}
      {renderOctave()}
    </>
  );
}

export type ParamNote =
  | `${Lowercase<Letter>}_${Lowercase<Modifier>}`
  | `${Lowercase<Letter>}_`;

function paramNoteToGenericNote(paramNote: ParamNote): Note {
  const [lowerLetter, lowerModifier] = paramNote.split("_");
  const letter = lowerLetter.toUpperCase() as Letter;

  let modifier;
  if (isExisty(lowerModifier)) {
    modifier = lowerModifier.toUpperCase() as Modifier;
  }

  return {
    letter,
    modifier,
  };
}

export function genericNoteToParamNote({ letter, modifier }: Note): ParamNote {
  return `${toLowerCase(letter)}_${toLowerCase(modifier ?? "")}`;
}

export function paramNoteToIndex(paramNote: ParamNote, genericScales: Scale[]) {
  const genericNote = paramNoteToGenericNote(paramNote);
  return genericScales.findIndex((scale) =>
    areNotesEqual(scale.root, genericNote)
  );
}
