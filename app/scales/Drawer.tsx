import "@reach/dialog/styles.css";
import { ReactNode, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import {
  MdKeyboardArrowLeft as ArrowLeftIcon,
  MdKeyboardArrowRight as ArrowRightIcon,
} from "react-icons/md";

export default function Drawer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={tm(
        "absolute right-0 top-0 bottom-0 m-auto h-max",
        "flex items-center"
      )}
    >
      <button
        className={tm(
          "border-4 border-r-0 border-neutral rounded-lg rounded-r-none h-min"
        )}
        onClick={() => setIsOpen((p) => !p)}
      >
        {isOpen ? (
          <ArrowRightIcon className="swap-off text-primary" size={60} />
        ) : (
          <ArrowLeftIcon className="swap-on text-primary" size={60} />
        )}
      </button>

      <div
        className={tm(
          isOpen &&
            "p-10 border-4 border-r-0 rounded-r-none border-neutral rounded-lg bg-base-100"
        )}
      >
        {isOpen ? children : null}
      </div>
    </div>
  );
}
