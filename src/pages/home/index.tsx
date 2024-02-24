import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!keyword) toast.error("Input Keyword");
    else navigate(`/results?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-900 to-purple-500 min-h-screen">
      <form
        onSubmit={handleSearch}
        className="absolute bottom-[26px] flex flex-col justify-center items-center w-full"
      >
        <input
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
  );
}
