import { Note } from "./genericNotes";

export type HoleName =
  | `${"LEFT" | "RIGHT"}_BIG_HOLE`
  | `${
      | "FIRST"
      | "SECOND"
      | "THIRD"
      | "FOURTH"
      | "FIFTH"
      | "SIXTH"
      | "SEVENTH"
      | "EIGHTH"}_STANDARD_HOLE`
  | `${"LEFT" | "RIGHT"}_HALF_HOLE`;

export type HoleConfiguration = [
  { name: "FIRST_STANDARD_HOLE"; isCovered: boolean },
  {
    name: "SECOND_STANDARD_HOLE";
    isCovered: boolean;
  },
  { name: "THIRD_STANDARD_HOLE"; isCovered: boolean },
  {
    name: "FOURTH_STANDARD_HOLE";
    isCovered: boolean;
  },
  { name: "FIFTH_STANDARD_HOLE"; isCovered: boolean },
  { name: "SIXTH_STANDARD_HOLE"; isCovered: boolean },
  {
    name: "SEVENTH_STANDARD_HOLE";
    isCovered: boolean;
  },
  {
    name: "EIGHTH_STANDARD_HOLE";
    isCovered: boolean;
  },
  { name: "RIGHT_HALF_HOLE"; isCovered: boolean },
  { name: "LEFT_HALF_HOLE"; isCovered: boolean },
  { name: "LEFT_BIG_HOLE"; isCovered: boolean },
  { name: "RIGHT_BIG_HOLE"; isCovered: boolean }
];

export interface OcarinaNote {
  octave: 0 | 1;
  note: Note;
  variants: HoleConfiguration[];
  index: number;
}

const ocarinaNotesWithoutIndex: Omit<OcarinaNote, "index">[] = [
  {
    octave: 0,
    note: { letter: "A" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: true },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: true },
        { name: "LEFT_HALF_HOLE", isCovered: true },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "A", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: true },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: true },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "B" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: true },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: true },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "C" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: true },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "C", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: true },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "D" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "D", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: true },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: true },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "E" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: true },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "F" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: true },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "F", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "G" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: true },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 0,
    note: { letter: "G", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "A" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "A", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: true },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "B" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "C" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: true },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "C", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: true },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "D" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "D", modifier: "SHARP" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: true },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: false },
      ],
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: false },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: true },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "E" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: true },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: false },
      ],
    ],
  },
  {
    octave: 1,
    note: { letter: "F" },
    variants: [
      [
        { name: "FIRST_STANDARD_HOLE", isCovered: false },
        { name: "SECOND_STANDARD_HOLE", isCovered: false },
        { name: "THIRD_STANDARD_HOLE", isCovered: false },
        { name: "FOURTH_STANDARD_HOLE", isCovered: false },
        { name: "FIFTH_STANDARD_HOLE", isCovered: false },
        { name: "SIXTH_STANDARD_HOLE", isCovered: false },
        { name: "SEVENTH_STANDARD_HOLE", isCovered: false },
        { name: "EIGHTH_STANDARD_HOLE", isCovered: false },
        { name: "RIGHT_HALF_HOLE", isCovered: false },
        { name: "LEFT_HALF_HOLE", isCovered: false },
        { name: "LEFT_BIG_HOLE", isCovered: false },
        { name: "RIGHT_BIG_HOLE", isCovered: false },
      ],
    ],
  },
];

export const ocarinaNotes: OcarinaNote[] = ocarinaNotesWithoutIndex.map(
  (ocarinaNote, index) => {
    return {
      ...ocarinaNote,
      index,
    };
  }
);
