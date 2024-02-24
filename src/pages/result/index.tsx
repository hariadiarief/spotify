import IconClose from "@/components/icons/IconClose";
import IconPause from "@/components/icons/IconPause";
import IconPlay from "@/components/icons/IconPlay";
import IconSearch from "@/components/icons/IconSearch";
import IconMenu from "@/components/icons/Menu";
import { axiosInstance } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ITrackList {
  isLoading: boolean;
  isHasMore: string | null;
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
        <IconPause
          width={42}
          height={42}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white"
        />
      ) : (
        <IconPlay
          width={42}
          height={42}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white"
        />
      )}
    </div>
  );
};

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keywordParams = searchParams.get("keyword") || "";

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!keyword) toast.error("Input Keyword");
    else navigate(`/results?keyword=${encodeURIComponent(keyword)}`);

    setIsModalOpen(false);
  };

  const [result, setResult] = useState<ITrackList>({
    isLoading: false,
    isHasMore: null,
    limit: 10,
    items: [],
  });

  const fethSearch = ({ loadMore }: { loadMore?: boolean }): void => {
    console.log(keywordParams && !result.isLoading);

    if (keywordParams) {
      axiosInstance
        .get(
          `/search?term=${encodeURIComponent(keywordParams)}&entity=song&limit=${loadMore ? result.limit + 10 : result.limit}`
        )
        .then((response) => {
          setResult({
            ...result,
            isLoading: false,
            items: response.data.results,
            limit: response.data.resultCount,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoadingMore(false));
    }
  };
  useEffect(() => {
    fethSearch({ loadMore: false });
  }, [keywordParams]);

  const loadMore = () => {
    setIsLoadingMore(true);
    fethSearch({ loadMore: true });
  };

  return (
    <>
      <div>
        <nav className="headers-container flex justify-between px-5 items-center rounded-b-[40%] sticky bg-gradient-to-r from-purple-900 to-purple-500 min-h-[60px] shadow">
          <IconMenu />
          <img
            onClick={() => navigate("/")}
            className=""
            src="/images/ngmusic.png"
            alt=""
          />
          <IconSearch onClick={() => setIsModalOpen(true)} />
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
                <div className="flex gap-1">
                  <img src="/icons/currency-dollar.png" alt="" />
                  <span className="text-[#f5b014]">{item.trackPrice}</span>
                </div>
              </div>
            ))
          )}
          <button
            className=" mt-[20px] px-6 py-[10px] rounded-17 bg-gray-300 border-none rounded-full w-fit"
            onClick={loadMore}
            disabled={result.isLoading || isLoadingMore}
          >
            {isLoadingMore ? "Loading" : "Load More"}
          </button>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modalContainer "
        overlayClassName="modalOverlayCenter"
      >
        <div className="modalOverlayCenterInside flex flex-col">
          <div className="w-full p-4 flex justify-end">
            <IconClose onClick={() => setIsModalOpen(false)} />
          </div>
          <form
            onSubmit={handleSearch}
            className="grow bottom-[26px] flex flex-col justify-center items-center w-full"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Artist / Album / Title"
              type="text"
              className="mb-[15px] rounded-full border-none py-[13px] px-[12px] w-[80%] text-center"
            />
            <button
              onClick={() => handleSearch}
              className="mb-[15px rounded-full bg-white] border-none py-[13px] px-[12px] w-[80%] text-center bg-white bg-opacity-20 text-white"
            >
              Search
            </button>
          </form>
        </div>
      </ReactModal>
    </>
  );
};

export default Results;
