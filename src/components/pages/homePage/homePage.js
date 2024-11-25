import React, { useEffect } from "react";
import { Header } from "./components/header";
import wallpapre from "../../../assets/vendetta.jpeg";
import { Movie } from "./components/movie";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import { fetchData } from "../../../api/fetchData";
import { Footer } from "./components/footer";
import { Outlet } from "@tanstack/react-router";

export const HomePage = () => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationKey: "moveData",
    mutationFn: fetchData,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: "success",
        message: "Data loaded successfully",
      });
      console.log("checking the data:", data?.results);
    },
    onError: (error) => {
      enqueueSnackbar({
        variant: "error",
        message: "Sorry an error occored",
      });
      console.log("checking the error that occored: ", error);
    },
  });

  useEffect(() => {
    mutate(
      "https://api.themoviedb.org/3/discover/movie?api_key=7f46651666f1ca68e4cf0cb150551f07",
      "GET"
    );
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="pt-6">
          <Header />
        </div>
        <div className="w-[75%] mx-auto flex flex-row justify-between mt-20 gap-10">
          <div className="text-5xl text-white font-Kenio w-[55%] text-center">
            Welcome to NetClone, your go-to place for movie details and
            trailers!
          </div>
          <div className="w-[50%]">
            <img
              className="w-[100%] h-[40vh] rounded-lg"
              src={wallpapre}
              alt="wallpaper"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] mx-auto mt-20 flex flex-wrap justify-between gap-[25px]">
          {isPending ? (
            <p>Loading</p>
          ) : isSuccess && data?.results?.length > 0 ? (
            data.results.map((movie, index) => (
              <div key={index} className="w-[20%] mx-auto">
                <Movie
                  title={movie.title}
                  image={movie.backdrop_path}
                  viewRate={movie.popularity}
                  id={movie.id}
                  overview={movie.overview}
                />
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </section>
      {/* <Outlet /> */}
      <section>
        <Footer />
      </section>
    </React.Fragment>
  );
};
