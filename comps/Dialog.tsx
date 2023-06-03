import {
  DialogOverlay,
  DialogContent,
  DialogOverlayProps,
} from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ReactNode, useCallback, useState } from "react";
import "./Dialog.scss";

export default function MyDialog(
  props: DialogOverlayProps & { children: ReactNode }
) {
  return (
    <DialogOverlay {...props}>
      <DialogContent>{props.children}</DialogContent>
    </DialogOverlay>
  );
}

export function useDialogControls() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const show = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { close, show, isOpen };
}
