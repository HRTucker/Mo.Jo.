import React from 'react';
import ReactDOM from 'react-dom';
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import NavBar from './Components/NavBar';
import DBList from './Components/DBList';
import PageBtn from './Components/PageBtn';
import SearchBar from './Components/SearchBar';
import CategoryBar from './Components/CategoryBar';
import SearchList from './Components/SearchList';
import EntryPage from './Components/EntryPage';

const initialState = {
  data: [],
  currentPage: 1,
  lastContent: ''
};

function reducer(state = initialState, action){
  switch(action.type){
    case 'ADD_DATA':
      return {...state, data: action.data};
    case 'CHANGE_PAGE':
      return {...state, currentPage: action.currentPage}
    case 'CHANGE_LASTCONTENT':
      return {...state, lastContent: action.lastContent}
    default:
      return state;
  }
}
/*
class Menu extends React.Component {
  dbKey = "";
  currentPage = 1;
  constructor() {
    super();
    this.dbKey = "e833f3c47fcf6bf2535dc3d54011b8fe";
  }

  componentDidMount(){
    this.getTrending();
  }

  state = {
    films: [],
    currentPage: 1,
    currentContent: ``
  }
  //https://api.themoviedb.org/3/discover/movie?api_key=${this.dbKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28&without_genres=35%2C%2027%2C%2010749%2C%2053

  ListFilms = () => {
    var filmsArr = this.state.films;
    const filmList = filmsArr.map((film, index)=>
      
      <div>
        {(film.poster_path && film.backdrop_path)?(
        <div id={film.id} className="film-thumb" key={film.id} onClick={this.thumbClicked} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${film.backdrop_path || film.poster_path}')` }}>
          <div className="film-thumb-content">
            <p className='thumb-title'>{film.title || film.name}</p>
            <div className='thumb-info'>
              <p>Rating: {film.vote_average}</p>
            </div>
          </div>
        </div>
        ):(<p visibility="hidden"></p>)}
      </div>)

    return <div className="list-container">{filmList}</div>;

  }

  //Button Functions
  getTrending = () => {
    this.currentPage = 1;
    this.getDB("trending");}
  getFilms = () => {
    this.currentPage = 1;
    this.getDB("films");}
  getTV = () => {
    this.currentPage = 1;
    this.getDB("tv");}
  getPreviousPage = () =>{
    if(this.currentPage != 1){
      this.currentPage--
      this.getDB(this.state.currentContent);
    }
  }
  getNextPage = () =>{
    if(this.currentPage != 1000){
      this.currentPage++
      this.getDB(this.state.currentContent);
    }
  }

  NavBar = () => {
    return <div className='nav-bar'>
      <input id="search-input" type="text" onChange={this.searchDB}/>
      <button className='nav-btn' onClick={this.searchDB}>Search</button>
      <button className='nav-btn' onClick={this.getTrending}>Trending</button>
      <button className='nav-btn' onClick={this.getFilms}>Films</button>
      <button className='nav-btn' onClick={this.getTV}>TV</button>
      <button className='nav-btn' >Genres</button>
    </div>;
  }

  PageButtons = () => {
    return<div className='page-bar'>
      <input type='button' className='page-btn' value="<" onClick={this.getPreviousPage}/>
      <p className='page-num'>Page: {this.currentPage}</p>
      <input type='button' className='page-btn' value=">" onClick={this.getNextPage}/>
    </div>
  }

  thumbClicked(e){
    console.log(e.target.id + e.target.className);
    document.getElementById(e.target.id).classList.toggle("clicked");
  }

  render() {
    return <div>
      <this.NavBar/>
      <this.PageButtons/>
      <this.ListFilms/>
    </div>
    
  }

}*/

const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div className='core-layout'>
        <NavBar />
        <div className='content'>
          <SearchBar/>
          <Routes>
            <Route exact path="/" element={<Navigate to="/trending" />} />
            <Route path="/search" Component={() => (<div><SearchList/></div>)} />
            <Route exact path="/trending" Component={() => (<div><CategoryBar catHead="Trending"/><PageBtn /><DBList /></div>)} />
            <Route exact path="/films" Component={() => (<div><PageBtn /><DBList /></div>)} />
            <Route exact path="/films" Component={() => (<div><PageBtn /><DBList /></div>)} />
            <Route exact path="/series" Component={() => (<div><PageBtn /><DBList /></div>)} />
            <Route exact path="/people" Component={() => (<div><PageBtn /><DBList /></div>)} />
            <Route path="entry/:type/:id" Component={() => (<div><EntryPage/></div>)} />
          </Routes>
        </div>
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
