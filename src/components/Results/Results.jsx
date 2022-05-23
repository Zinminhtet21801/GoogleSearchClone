import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContextProvider";
import { LoaderComponent } from "../Loader/LoaderComponent";
export const Results = () => {
  const { getResults, results, searchTerm, setSearchTerm, isLoading } =
    useResultContext();
  const location = useLocation();
  console.log(results);
  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <LoaderComponent />;
  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.[0]?.title && results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link && link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {console.log(results)}
          {results &&
            results?.map(({ image, link: { href, title } }, index) => (
              <a
                className="sm:p-3 p-5"
                href={href}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img src={image?.src} alt={title} loading="lazy" />
                <p className="w-36 break-words text-sm mt-2">{title}</p>
              </a>
            ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {console.log(results)}
          { results?.[0]?.id &&
            results.map(({ link, id, source, title }) => (
              <div key={id} className="md:w-2/5 w-full">
                <a
                  href={link?.[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
                <div className="flex gap-4">
                  <a href={source?.href} target="_blank" rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
              </div>
            ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results && results.map(({ link}, index) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={link}
                controls
                width="355px"
                height="200px"
              />
            </div>
          ))}
        </div>
      );
    default:
      return "ERROR!";
  }
};
