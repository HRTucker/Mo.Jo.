import './EntryPage.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TMDB_API from '../TMDBAPI/TMDB_API';

function EntryPage(){
    const [data, setData] = useState([]);
    const {id ,type} = useParams();

    function getEntryData() {

        const dbKey = "e833f3c47fcf6bf2535dc3d54011b8fe";

        var url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${dbKey}&language=en-US`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setData(JSON.parse(data));
                console.log(JSON.parse(data));
            })
            .catch(error => {
                console.error('Error fetching entry data:', error);
            });
    }

    useEffect(() => {
        getEntryData();
    },[]);

    async function testDBConnection(){
        await fetch('http://192.168.4.28:4200/users')
            .then(response =>{
                if(!response.ok){
                    throw new Error('DB reponse was not ok')
                }
                return response.text();
            })
            .then(data => {
                console.log(JSON.parse(data));
            })
            .catch(error => {
                console.log("Error fetching database list:", error);
            })
    }

    function testAPI(){
        const api = TMDB_API();
        console.log(api);
    }
    

    /* sub-components */

    function TitlePoster(){
        const title = data.title || data.name || "";
        const upperCaseTitle = title.toUpperCase();

        const releaseDate = data.release_date || data.first_air_date || "";
        const releaseYear = releaseDate.split("-")[0];

        const runtimeArr = data.episode_run_time;
        console.log(runtimeArr);


        return (
            <div>
                <div className='entry-page-poster' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})` }}>
                    <div className='entry-page-poster-info'>
                        <p className='entry-page-poster-title'>{upperCaseTitle}</p>
                        <p className='entry-page-poster-sub'>Directed by Paul Schrader</p>
                        <p className='entry-page-poster-sub'>{releaseYear} | {data.runtime || runtimeArr} mins </p>
                        <button onClick={testAPI}>TestAPI</button>
                    </div>
                </div>
            </div>
        )
    }

    function CastCrewSection(){

    }

    function EntryDetails(){

    }

    return (
        <div>
            <TitlePoster/>
        </div>
        
    )
}

export default EntryPage;