import "@reach/dialog/styles.css";
import { ReactNode, useEffect, useState } from "react";
import { twMerge as tm } from "tailwind-merge";
import {
  MdKeyboardArrowLeft as ArrowLeftIcon,
  MdKeyboardArrowRight as ArrowRightIcon,
} from "react-icons/md";
import { motion, useAnimationControls, Variants } from "framer-motion";

export default function Drawer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(isOpen ? "active" : "inactive");
  }, [isOpen, controls]);

  const variants: Variants = {
    active: { x: 0 },
    inactive: { x: 280 },
  };

  return (
    <motion.div
      variants={variants}
      animate={controls}
      initial="active"
      className={tm("fixed top-0 right-0 bottom-0 m-auto h-max")}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="flex items-center">
        <button
          className={tm(
            "border-4 border-r-0 border-neutral rounded-lg rounded-r-none h-min bg-base-100"
          )}
          onClick={() => setIsOpen((p) => !p)}
        >
          {isOpen ? (
            <ArrowRightIcon className="swap-off text-primary" size={50} />
          ) : (
            <ArrowLeftIcon className="swap-on text-primary" size={50} />
          )}
        </button>
        <div
          className={tm(
            "px-4 py-8 border-4 border-r-0 rounded-r-none border-neutral rounded-lg bg-base-100",
            "w-[280px]"
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
