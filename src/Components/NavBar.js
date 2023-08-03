import './NavBar.css';
import React, { useEffect } from 'react';
import { addData, changeLastContent, changePage } from '../Redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './icons.svg';

function NavBar(props) {  

  const dbKey = "e833f3c47fcf6bf2535dc3d54011b8fe";

  function getDB(req) {
    var url = "";

    switch (req) {
      case "trending":
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${dbKey}`;
        break;
      case "films":
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${dbKey}`;
        break;
      case "tv":
        url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${dbKey}`;
        break;
      case "people":
        url = `https://api.themoviedb.org/3/person/popular?api_key=${dbKey}`
      default:
        return;
    }
    
    props.changePage(1);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(JSON.parse(data));
        console.log(JSON.parse(data).results);
        props.addData(JSON.parse(data).results);

        props.changeLastContent(url);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function searchDB(input) {
    if (input === "") { return };
    props.changePage(1);
    var url = `https://api.themoviedb.org/3/search/multi?api_key=${dbKey}&query=${input}&include_adult=false&sort_by=popularity`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        console.log(document.getElementById("search-input").value);
        console.log(JSON.parse(data).results);
        props.addData(JSON.parse(data).results);

        props.changeLastContent(url);
      })
      .catch(error => {
        console.error('Error fetching search data:', error);
      });
  }

  function getTrending() {
    //this.state.currentPage = 1;
    getDB("trending");
  }
  function getFilms() {
    //this.state.currentPage = 1;
    getDB("films");
  }
  function getTV() {
    //this.state.currentPage = 1;
    getDB("tv");
  }
  function getPeople() {
    //this.state.currentPage = 1;
    getDB("people");
  }

  function handleSearch(e) {
    searchDB(document.getElementById("search-input").value);
  }
  function handleEnter(e){
    if(e.key === "Enter"){
      handleSearch(e.target.value);
    }
  }

  useEffect(() =>{
    
  }, []);

  return (
    <div className='nav-bar'>
      <div className="site-title">
        <h2>Mo.Jo.</h2>
      </div>
      <Link to="/trending"><button className='nav-btn'>Trending</button></Link>
      <Link to="/films"><button className='nav-btn' onClick={getFilms}>Film</button></Link>
      <Link to="/series"><button className='nav-btn' onClick={getTV}>Series</button></Link>
      <Link to="/people"><button className='nav-btn' onClick={getPeople}>People</button></Link>
      <button className='nav-btn' >Genres</button>
    </div>
  );
}

const mapDispatchToProps = {
  addData,
  changeLastContent,
  changePage
}

function mapStateToProps(state){
  return{
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);