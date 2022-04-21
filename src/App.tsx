import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {routePaths,linkWithRoutes} from './config/routes'
import './App.scss';


import {Header} from "./components/UI";
import DiscoverPage from "./components/DiscoverPage";
import MovieDetailPage from "./components/MovieDetailPage";
import ManagePage from "./components/ManagePage";

function App() {
  return (
      <Router>
          <section className='app'>
            <header className='app__header'>
              <Header linkList={linkWithRoutes}/>
            </header>
            <main className='app__main'>
              <div>
                <Routes>
                  <Route  path={routePaths.discover} element={<DiscoverPage/>} />
                  <Route  path={routePaths.discoverMovie()} element={<MovieDetailPage/>} />
                  <Route path={routePaths.manage} element={<ManagePage/>}/>
                </Routes>
              </div>
            </main>
          </section>
      </Router>
  )

}

export default App;
