import React, { useEffect, useState } from "react";
import CategoryBar from "../Components/CategoryBar";
import tmdb_api from "../API/TMDB_API";

function FilmPage(){
    const [dramaData, setDramaData] = useState([]);
    const [actionData, setActionData] = useState([]);
    const [horrorData, setHorrorData] = useState([]);
    const [nowPlayingData, setNowPlayingData] = useState([]);

    useEffect(() => {
        const type = "movie"
        const asyncProcesses = async () => {
            setDramaData( await tmdb_api.film.getGenre(18, type));// Get Drama Movies
            setActionData( await tmdb_api.film.getGenre(28, type));// Get Action Movies
            setHorrorData( await tmdb_api.film.getGenre(27, type));// Get Horror Movies
            setNowPlayingData( await tmdb_api.film.getNowShowing(type));// Get Now-Showing Movies
        }
        asyncProcesses();
    }, []);

    return(
        <div>
            <CategoryBar title="Drama" data={dramaData} type="movie"/>
            <CategoryBar title="Action" data={actionData} type="movie"/>
            <CategoryBar title="Horror" data={horrorData} type="movie"/>
            <CategoryBar title="Now Showing" data={nowPlayingData} type="movie"/>
        </div>
    );
}

export default FilmPage;

//<CategoryBar genreId="28" type="movie"/>
//<CategoryBar genreId="35" type="movie"/>
//<CategoryBar genreId="80" type="movie"/>
//<CategoryBar genreId="53" type="movie"/>
//<CategoryBar genreId="27" type="movie"/>