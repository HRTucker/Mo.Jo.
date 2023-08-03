import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';

import NavBar from './Components/NavBar';
import DBList from './Components/DBList';
import PageBtn from './Components/PageBtn';
import SearchBar from './Components/SearchBar';
import CategoryBar from './Components/CategoryBar';
import SearchList from './Components/SearchList';
import EntryPage from './Components/EntryPage';
import GaugeMeter from './Components/GaugeMeter';

function App() {

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

  const store = createStore(reducer);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='core-layout'>
          <NavBar />
          <div className='content' ref="contentRef">
            <SearchBar/>
            <Routes>
              <Route exact path="/" element={<Navigate to="/trending" />} />
              <Route path="/search" Component={() => (<div><SearchList /></div>)} />
              <Route exact path="/trending" Component={() => (<div>< hidden GaugeMeter/><CategoryBar genreId="18" type="movie"/><CategoryBar genreId="28" type="movie"/><CategoryBar genreId="35" type="movie"/><CategoryBar genreId="80" type="movie"/><CategoryBar genreId="53" type="movie"/><CategoryBar genreId="27" type="movie"/></div>)} />
              <Route exact path="/films" Component={() => (<div><PageBtn /><DBList /></div>)} />
              <Route exact path="/films" Component={() => (<div><PageBtn /><DBList /></div>)} />
              <Route exact path="/series" Component={() => (<div><PageBtn /><DBList /></div>)} />
              <Route exact path="/people" Component={() => (<div><PageBtn /><DBList /></div>)} />
              <Route path="entry/:type/:id" Component={() => (<EntryPage />)} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
