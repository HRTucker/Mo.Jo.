import React, {useState,useEffect} from "react";
import "./DBList.css"
import { connect } from "react-redux";
import tmdb_api from "../API/TMDB_API";

function DBList(props){
    const [data, setData] = useState([]);

    useEffect(()=>{
      const asyncProcesses = async () =>{
        setData(await tmdb_api.film.getTrending());
      }
      asyncProcesses();
    }, []);

    
    function thumbClicked(e){
      console.log(e.target.id + e.target.className);
      document.getElementById(e.target.id).classList.toggle("clicked");
    }

    function LandscapeDisplay(props){
      const film = props.film;
      const index = props.index;

      return (
        <div className="thumb-container" key={index} >
          {(film.poster_path && film.backdrop_path) ? (
            <div id={film.id} className={'film-thumb'} onClick={thumbClicked} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${film.backdrop_path || film.poster_path}')` }}>
              <div className="film-thumb-content">
                <p className='thumb-title'>{film.title || film.name}</p>
                <div className='thumb-info'>
                  <p><b>Rating: </b>{film.vote_average}</p>
                  <p><b>Release Date: </b>{film.release_date}</p>
                  <p><b>Overview: </b>{film.overview}</p>
                </div>
              </div>
            </div>
          ) : (<p visibility="hidden"></p>)}
        </div>
      )
    }

    var filmList = [];

    if(data.results != null){
      const arr = data.results;
      filmList = arr.map((film, index)=> <LandscapeDisplay film={film} index={index} />)
    }

    return (
      <div className="list-container">
        {filmList}
      </div>
    ); 
  }


  export default DBList;