import { genericNoteToParamNote, notes } from "@/utils/genericNotes";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return notes.map((note) => {
    return {
      url: `https://guacarina.com/scales/${genericNoteToParamNote(note)}`,
    };
  });
}
