import React from "react";
import { useHover } from "react-use";
import { HoverMovie } from "./hover";

export const Movie = ({ title, image, viewRate, overview }) => {
  const element = (hovered) => (
    <div className="relative">
      <div className="w-full bg-slate-300 rounded-br-xl rounded-bl-xl text-red-600 flex flex-col justify-end p-3 relative">
        <small className="p-2 rounded-xl bg-Ared text-white absolute bottom-9 right-2">{`${viewRate
          .toString()
          .slice(0, 3)}${"K"}`}</small>
        <span className="text-Croissant">
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </span>
      </div>
      {hovered && (
        <div className="absolute left-0 right-4 bottom-[-25px] z-50 transition-all duration-500 ease-in-out">
          <HoverMovie
            title={title}
            image={image}
            viewRate={viewRate}
            overview={overview}
          />
        </div>
      )}
    </div>
  );
  const [hoverable, hovered] = useHover(element);

  return (
    <React.Fragment>
      <div className="w-[100%] h-[33vh] rounded-lg flex flex-col">
        <img
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt={image}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="flex-1"></div>
        {hoverable}
      </div>
    </React.Fragment>
  );
};
