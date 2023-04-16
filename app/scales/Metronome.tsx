import { useInterval } from "@/hooks/useInterval";
import { useEffect, useState } from "react";
import {
  AiOutlinePlayCircle as PlayIcon,
  AiOutlinePauseCircle as PauseIcon,
  AiOutlineArrowUp as ArrowUpIcon,
  AiOutlineArrowDown as ArrowDownIcon,
} from "react-icons/ai";
import Control from "./Control";
import "./Metronome.styles.scss";

export default function Metronome() {
  const minBpm = 10;
  const maxBpm = 400;
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [sound, setSound] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const ctx = new AudioContext();
        const response = await fetch("/click.wav");
        const arrayBuffer = await response.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuffer);

        setSound(decoded);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  useInterval(() => {
    if (!isPlaying || !sound) return;
    const ctx = new AudioContext();
    const playSound = ctx.createBufferSource();
    playSound.buffer = sound;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }, (60 / bpm) * 1000);

  const step = 5;
  return (
    <Control>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">metronome</h3>
        <article className="flex items-center gap-4">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={() => setIsPlaying((p) => !p)} />
            <PlayIcon className="swap-off text-primary" size={75} />
            <PauseIcon className="swap-on text-primary" size={75} />
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              placeholder="beats per minute"
              className="input input-bordered w-20"
              min={minBpm}
              max={maxBpm}
              value={bpm}
              step={step}
              disabled
            />
            <div className="flex flex-col">
              <button className="border-2 border-base-300 p-1 rounded-t-lg hover:text-primary">
                <ArrowUpIcon
                  size={16}
                  onClick={() =>
                    setBpm((p) => {
                      if (p <= maxBpm - step) {
                        return p + step;
                      }
                      return p;
                    })
                  }
                />
              </button>
              <button className="border-2 border-t-0 border-base-300 p-1 rounded-b-lg hover:text-primary">
                <ArrowDownIcon
                  size={16}
                  onClick={() =>
                    setBpm((p) => {
                      if (p >= minBpm + step) {
                        return p - step;
                      }
                      return p;
                    })
                  }
                />
              </button>
            </div>
          </div>
        </article>
      </div>
    </Control>
  );
}
