import './SearchList.css';
import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";

function SearchList(props){
    const [data, setData] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');


    async function SearchQuery(query){
        const dbKey = "e833f3c47fcf6bf2535dc3d54011b8fe";

        var url = `https://api.themoviedb.org/3/search/multi?api_key=${dbKey}&query=${encodeURIComponent(query)}&include_adult=false&page=1&append_to_response=page=2`;
        await fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setData(JSON.parse(data).results);
                console.log(JSON.parse(data).results);

            })
            .catch(error => {
                console.error('Error fetching search data:', error);
            });
    }

    function LandscapeFrame(props){
        const entry = props.entry;
        const index = props.index;

        return(
            <div className="search-entry" key={index}>
                    <div className='search-img' style={{ backgroundImage: ((entry.backdrop_path || entry.poster_path)?(`url('https://image.tmdb.org/t/p/w500/${entry.backdrop_path || entry.poster_path}')`):(null)) }}/>
                    <div>
                        <Link className="search-entry-title" to={`/entry/${entry.media_type}/${entry.id}`}>{entry.title || entry.name}</Link>
                        <p className="search-entry-title">{(entry.release_date|| entry.first_air_date)}</p>
                        <p className="search-entry-title">{entry.media_type !== null ? ((entry.media_type) == "tv" ? "Series" : "Film") : "Other"}</p>
                    </div>
            </div>
        )
    }

    const arr = data.sort((a,b) => b.popularity - a.popularity);

    const entryList = arr.map((entry, index)=>
        <div className="search-item" key={index}>
            <LandscapeFrame entry={entry} index={index} />
        </div>
    )

    useEffect(()=>{
        SearchQuery(query);
        console.log(query);
    },[location.search])

    return(
        <div className="search-list">
            {entryList}            
        </div>
    );
}

export default SearchList;