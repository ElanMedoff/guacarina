import { notes, scaleInfoToParam, ScalePattern } from "@/utils/genericNotes";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return notes
    .map((note) => {
      return (["major", "minor"] as ScalePattern[]).map((scalePattern) => {
        return {
          url: `https://guacarina.com/scales/${scaleInfoToParam(
            note,
            scalePattern
          )}`,
        };
      });
    })
    .flat();
}
