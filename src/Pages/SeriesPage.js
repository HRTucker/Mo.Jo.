import React, { useEffect, useState } from "react";
import CategoryBar from "../Components/CategoryBar";
import tmdb_api from "../API/TMDB_API";

function SeriesPage(){
    const [data01, setData01] = useState([]);
    const [data02, setData02] = useState([]);
    const [data03, setData03] = useState([]);
    const [data04, setData04] = useState([]);

    useEffect(() => {
        const type = "tv"
        const asyncProcesses = async () => {
            setData01( await tmdb_api.film.getGenre(9648, type));//Get Mystery Tv
            setData02( await tmdb_api.film.getGenre(37, type));// Get Western Tv
            setData03( await tmdb_api.film.getGenre(10765, type));// Get Sci-fi $ Fantasy Tv
            setData04( await tmdb_api.film.getNowShowing(type));// Needs changing
        }
        asyncProcesses();
    }, []);

    return(
        <div>
            <CategoryBar title="Mystery" data={data01} type="tv"/>
            <CategoryBar title="Western" data={data02} type="tv"/>
            <CategoryBar title="Sci-Fi & Fantasy" data={data03} type="tv"/>
            <CategoryBar title="Now Showing" data={data04} type="tv"/>
        </div>
    );
}

export default SeriesPage;