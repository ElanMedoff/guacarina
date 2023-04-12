import React from "react";
import Ocarina from "./Ocarina";
import styles from "./OcarinaWrapper.module.scss";
import { ocarinaNotes } from "@/utils/ocarinaNotes";
import { nanoid } from "nanoid";

export default function OcarinaWrapper() {
  return (
    <div className={"border-2 border-red-500"}>
      {ocarinaNotes.map((ocarinaNote) =>
        ocarinaNote.variants.map((variant) => (
          <div className={"border-4 border-green-500 w-40 h-40"} key={nanoid()}>
            <Ocarina configuration={variant} />
            {JSON.stringify(ocarinaNote.note)}
          </div>
        ))
      )}
      <div className={styles.circle} style={{}}></div>
    </div>
  );
}
