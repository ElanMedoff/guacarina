import { useCallback, useEffect, useState } from "react";
import {
  AiOutlinePlayCircle as PlayIcon,
  AiOutlinePauseCircle as PauseIcon,
} from "react-icons/ai";
import Panel from "@/app/scales/[scale]/Panel";
import { useTimer } from "react-use-precision-timer";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const minBpm = 10;
  const maxBpm = 400;
  const [isPlaying, setIsPlaying] = useState(false);
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

  const callback = useCallback(() => {
    if (!isPlaying || !sound) return;
    const ctx = new AudioContext();
    const playSound = ctx.createBufferSource();
    playSound.buffer = sound;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }, [isPlaying, sound]);

  const timer = useTimer(
    { delay: (60 / bpm) * 1000, fireOnStart: true },
    callback
  );

  const step = 5;
  return (
    <Panel>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg">metronome</h3>
        <article className="flex items-center gap-4">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={() => {
                if (isPlaying) {
                  timer.stop();
                } else {
                  timer.isStarted() ? timer.resume() : timer.start();
                }
                setIsPlaying((p) => !p);
              }}
            />
            <PlayIcon className="swap-off text-primary" size={75} />
            <PauseIcon className="swap-on text-primary" size={75} />
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              placeholder="bpm"
              className="input input-bordered w-28"
              min={minBpm}
              max={maxBpm}
              value={bpm}
              step={step}
              onChange={(e) => {
                const parsed = parseInt(e.target.value);

                if (Number.isNaN(parsed)) {
                  setBpm(minBpm);
                  return;
                }
                if (parsed < minBpm) {
                  setBpm(minBpm);
                  return;
                }
                if (parsed > maxBpm) {
                  setBpm(maxBpm);
                  return;
                }

                setBpm(parsed);
              }}
            />
          </div>
        </article>
      </div>
    </Panel>
  );
}
