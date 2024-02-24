import IconPause from "@/components/icons/IconPause";
import IconPlay from "@/components/icons/IconPlay";
import { useRef, useState } from "react";
import { Itrack } from "./type";

export default function Player({ item }: { item: Itrack }) {
  console.log({ item });

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const toggleAudio = (trackId: number) => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsPlaying(null);
        audioRef.current.pause();
      } else {
        setIsPlaying(trackId);
        audioRef.current.play();
      }
    }
  };

  return (
    <div onClick={() => toggleAudio(item.trackId)} className="relative">
      <audio ref={audioRef} src={item.previewUrl} />
      <img
        className="rounded h-[100px] w-[100px]"
        src={item.artworkUrl60}
        alt=""
      />
      {isPlaying === item.trackId ? (
        <IconPause className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
      ) : (
        <IconPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
      )}
    </div>
  );
}
