import React, { useEffect, useState } from "react";
import { Links } from "../componentsExporter";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useDebounce } from "use-debounce";
export const Search = () => {
  const [text, setText] = useState("Google");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 500);
  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);
  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3" >
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="Search Something bitches"
        onChange={(event) => setText(event.target.value)}
      />
      {text && (
        <button
          className="absolute top-2 right-4 text-2xl text-gray-500"
          onClick={() => setText("")}
        >X</button>
      )}
      <Links />
    </div>
  );
};
