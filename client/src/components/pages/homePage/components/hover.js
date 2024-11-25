import React from "react";

export const HoverMovie = ({ title, image, viewRate, overview }) => {
  return (
    <React.Fragment>
      <div className="relative w-[45vh] h-auto bg-white z-50 p-4 m-3 rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt={image}
          className="rounded-lg"
        />
        <span className="absolute right-4 top-4 z-40 bg-Ared p-1 rounded-lg text-white font-Kenio font-semibold">
          <small className="text-[16px]">Views :</small>
          {`${viewRate.toString().slice(0, 3)}K`}
        </span>
        <h5 className="font-bold font-segoe text-center underline">{title}</h5>
        <p className="text-Ared font-segoe font-semibold">Overview:</p>
        <p>{overview.length > 0 ? overview.slice(0, 70) + "..." : overview}</p>
        <button className="w-full p-2 text-white font-Kenio bg-Ared rounded-xl mt-1 mb-1">
          Download
        </button>
      </div>
    </React.Fragment>
  );
};
