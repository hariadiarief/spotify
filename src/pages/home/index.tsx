import React, { useState } from "react";
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
    <div className="flex justify-center items-center flex-col bg-gradient-to-br from-purple-900 to-purple-500 min-h-screen">
      <div className="grow items-center flex">
        <img src="/images/logo.png" alt="" />
      </div>
      <form
        onSubmit={handleSearch}
        className=" mb-[26px]  flex flex-col justify-center items-center w-full"
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
