import Layout from "@/components/Layout";
import { axiosInstance } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IpokemonList {
  isLoading: boolean;

  isLoadingMore: boolean;
  isHasMore: string | null;
  offset: number;
  limit: number;

  items: Itrack[];
}

interface Itrack {
  artistName: string;
  trackName: string;
  trackPrice: number;
  artworkUrl60: string;
  trackId: number;
  primaryGenreName: string;
  previewUrl: string;
}

const Player = ({ item }: { item: Itrack }) => {
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
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ) : (
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.804 12.204l-4.804 3.152V8.052l4.804 3.152z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </div>
  );
};

const Results = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState<IpokemonList>({
    isLoading: true,
    isLoadingMore: false,
    isHasMore: null,
    offset: 0,
    limit: 10,
    items: [],
  });

  const fethSearch = () => {
    if (result.isLoading || result.isLoadingMore) {
      axiosInstance
        .get(`/search?term=iwan%20fals&entity=song&limit=10`)
        .then((response) => {
          setResult({
            ...result,
            isHasMore: response.data.next,
            isLoadingMore: false,
            isLoading: false,
            items: result.items.concat(response.data.results),
            offset: result.offset + result.limit,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(fethSearch, [result]);

  const loadMore = () => {
    setResult({
      ...result,
      isLoadingMore: true,
    });
  };

  return (
    <div>
      <nav className="headers-container flex justify-between px-5 items-center rounded-b-[40%] sticky bg-gradient-to-r from-purple-900 to-purple-500 min-h-[60px] shadow">
        <img className="w-[24px] h-[24px]" src="/icons/menu.svg" alt="" />
        <img onClick={()=>navigate('/')} className="" src="/images/ngmusic.png" alt="" />
        <img onClick={()=>navigate('/')} className="w-[24px] h-[24px]" src="/icons/search.svg" alt="" />
      </nav>

      <div className="px-6 mt-6 gap-y-[20px] flex flex-col pb-6 items-center">
        {!result.items.length || result.isLoading ? (
          <div>Loading</div>
        ) : (
          result.items.map((item) => (
            <div
              key={item.trackId}
              className="w-full gap-x-2 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow flex   items-center"
            >
              <Player item={item} />

              <div className="w-full">
                <div>{item.artistName}</div>
                <div className="mt-[5px]">{item.trackName}</div>
                <div className="mt-[16px] bg-[#10b981] w-fit px-[13px] py-[5px] rounded-full text-white">
                  {item.primaryGenreName}
                </div>
              </div>
              <div className="">{item.trackPrice}</div>
            </div>
          ))
        )}
        <button
          className=" mt-[20px] px-6 py-[10px] rounded-17 bg-gray-300 border-none rounded-full w-fit"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Results;
