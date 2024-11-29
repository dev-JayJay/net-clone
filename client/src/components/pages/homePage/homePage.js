import React, { useEffect, useRef } from "react";
import { Header } from "./components/header";
import wallpapre from "../../../assets/vendetta.jpeg";
import { Movie } from "./components/movie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import { fetchData } from "../../../api/fetchData";
import { Footer } from "./components/footer";
import { Outlet } from "@tanstack/react-router";

import { useKeycloak } from "../../../keycloak";

export const HomePage = () => {
  // const IsRun = useRef(false);
  const { authenticated, logout, getToken } = useKeycloak();

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["movieData"],
    queryFn: () =>
      fetchData("https://api.themoviedb.org/3/discover/movie?api_key=7f46651666f1ca68e4cf0cb150551f07","GET"),
    enabled: authenticated,
  });

  if (data) {
      enqueueSnackbar({
        variant: "success",
        message: "Data loaded successfully",
      });
      console.log('Data loaded successfully:', data);
  } else if (error) {
      enqueueSnackbar({
        variant: "error",
        message: "Sorry, an error occurred.",
      });
      console.log("Error occurred: ", error);
  }

  console.log("checking the data:", data?.results);
  console.log(`checking is isLoading status ${isLoading}`);
  console.log(`checking is success status ${isSuccess}`);
  console.log(`checking is error status ${isError}`);
  console.log(`this is the token ${getToken()}`);

  const handleLogout = () => {
    logout();
    enqueueSnackbar({
      variant: "success",
      message: "You have successfully logged out.",
    });
  };

  return (
    <React.Fragment>
      <section>
        <div className="pt-6">
          <Header />
        </div>
        {authenticated && (
        <div className="flex justify-between items-center mr-10">
          <button
            onClick={handleLogout}
            className="bg-Ared p-2 rounded-lg ml-auto"
          >
            Logout
          </button>
        </div>
        )}
        {/* <button onClick={logout} className="bg-Ared p-2 rounded-lg mr-auto">logout</button> */}
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
          {isLoading ? (
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


// to implement useMutation if you don't want to use useQuery this is a second alternate choice to fetch data in query tanksack

  // const { mutate, isLoading, isError, isSuccess, data, error } = useMutation({
  //   mutationKey: "moveData",
  //   mutationFn: fetchData,
  //   onSuccess: (data) => {
  //     enqueueSnackbar({
  //       variant: "success",
  //       message: "Data loaded successfully",
  //     });
  //     console.log("checking the data:", data?.results);
  //     console.log(`checking is pending status ${isLoading}`);
  //     console.log(`checking is success status ${isSuccess}`);
  //     console.log(`checking is error status ${isError}`);
  //     console.log(`checking data ${data}`);
  //     console.log(`checking error ${error}`);
  //   },
  //   onError: (error) => {
  //     enqueueSnackbar({
  //       variant: "error",
  //       message: "Sorry an error occored",
  //     });
  //     console.log("checking the error that occored: ", error);
  //   },
  // });

  // useEffect(() => {
  //   if(IsRun.current) return;
  //     IsRun.current = true;
  //   mutate(
  //     "https://api.themoviedb.org/3/discover/movie?api_key=7f46651666f1ca68e4cf0cb150551f07",
  //     "GET"
  //   );
  // }, [authenticated]);