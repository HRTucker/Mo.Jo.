import './EntryPage.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb_api from '../API/TMDB_API';
import IconMale from '../Icons/IconMale';
import IconFemale from '../Icons/IconFemale';

function EntryPage(){
    const [data, setData] = useState([]);
    const [credits, setCredits] = useState([]);
    const {id ,type} = useParams();

    useEffect(() => {
        const asyncProcesses = async () => {
            setData(await tmdb_api.film.getFullDetails(id, type));
            //setCredits(await tmdb_api.film.getCredits(id, type));
            console.log(data);
        }
        asyncProcesses();

        document.getElementsByClassName("content")[0].scrollTo(0,0);
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
        //const api = tmdb_api;
        //console.log(api.film().getTrending());
        //console.log(api.series());
    }
    

    /* sub-components */

    function TitlePoster(){
        console.log(data);
        const title = data.title || data.name || "";
        const upperCaseTitle = title.toUpperCase();

        const releaseDate = data.release_date || data.first_air_date || "";
        const releaseYear = releaseDate.split("-")[0];

        const runtimeArr = data.episode_run_time;
        //console.log(runtimeArr);

        //Credits
        let director = "";
        let writer = "";
        let screenwriter = "";

        if(data.credits && data.credits){
            const crew = data.credits.crew;
            const cast = data.credits.cast;

            if(crew[crew.findIndex((mem) => mem.job === "Director")]){
                director = crew[crew.findIndex((mem) => mem.job === "Director")].name;
            }
            if(crew[crew.findIndex((mem) => mem.job === "Writer")]){
                writer = crew[crew.findIndex((mem) => mem.job === "Writer")].name;
            }
            if(crew[data.credits.crew.findIndex((mem) => mem.job === "Screenplay")]){
                screenwriter = crew[crew.findIndex((mem) => mem.job === "Screenplay")].name;
            }
        }

        return (
            <div className='entry-page-poster' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})` }}>
                <div className='entry-page-poster-info'>
                    <p className='entry-page-poster-title'>{upperCaseTitle}</p>
                    <p className='entry-page-poster-title'>{}</p>
                    {(director === writer)?(
                            <p className='entry-page-poster-sub'>Director & Writer,  {director}</p>
                        ):(
                        <div>
                            <p className='entry-page-poster-sub'>Director, {director}</p>
                            <p className='entry-page-poster-sub'>Writer, {writer || screenwriter}</p>
                        </div>
                        )}
                    <p className='entry-page-poster-sub'>{releaseYear} | {data.runtime || runtimeArr} mins </p>
                    <button hidden onClick={testAPI}>TestAPI</button>
                </div>
            </div>
        )
    }

    function CastCrewSection(){
        let cast = [];
        let crew = [];

        if(data.credits){
            cast = data.credits.cast.slice(0,8);
            crew = data.credits.crew.slice(0,8);
        }

        console.log(cast)

        const castList = cast.map((person, index)=>
            <div className="entry-page-cast-crew-frame" key={index}>
                <div className='entry-page-cast-crew-image' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${person.profile_path})` }}>
                    {(person.profile_path)?(<div></div>):(
                        (person.gender == 2)?(<IconMale/>):(<IconFemale/>)
                    )}
                </div>
                <div className='entry-page-cast-crew-info'>
                    <p>{person.name}</p>
                    <p>Cast</p>
                </div>
            </div>
        )

        const crewList = crew.map((person, index)=>
            <div className="entry-page-cast-crew-frame" key={index}>
                <div className='entry-page-cast-crew-image' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${person.profile_path})` }}>
                    {(person.profile_path) ? (<div></div>) : (
                        (person.gender == 2) ? (<IconMale />) : (<IconFemale />)
                    )}
                </div>
                <div className='entry-page-cast-crew-info'>
                    <p>{person.name}</p>
                    <p>{person.job}</p>
                </div>
            </div>
        )

        return (
            <div className='entry-page-cast-crew'>
                <h1 className='entry-page-sub-title'>Cast</h1>
                <div className='entry-page-cast-list'>
                    {castList}
                </div>
                <h1 className='entry-page-sub-title'>Crew</h1>
                <div className='entry-page-cast-list'>
                    {crewList}
                </div>
            </div>
        )
    }

    function EntryDetails(){
        return(
            <div>
                <h1 className='entry-page-cast-crew'>Details</h1>
                <p>Titles</p>
                <p>Tagline</p>
                <p>Overview</p>
                <p>Release Date</p>
                <p>Genres</p>
                <p>Languages</p>
                <p>Country of Origin</p>
                <p>Spoken Language</p>
                <p></p>
            </div>
        )
    }

    function Recommendations(){

    }

    function MoreFromDirector(){

    }

    /*
        Todo:
            Budget
            Genres
            Tagline
            Overview
            Videos
            Posters
            Status
            Original Language
            Country of Origin
            Spoken Languages
            Production Comps
            Recommendations
            More from the director
    */
    
    return (
        <div className='entry-page-container'>
            {(data)?(<TitlePoster/>):(<div></div>)}
            {(credits)?(<CastCrewSection/>):(<div></div>)}
            {(data)?(<EntryDetails/>):(<div></div>)}
        </div>
        
    )
}

export default EntryPage;