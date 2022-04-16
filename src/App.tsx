import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {routePaths,linkWithRoutes} from './config/routes'
import './App.css';


import {Header} from "./components/UI";
import DiscoverPage from "./components/DiscoverPage";
import ManagePage from "./components/ManagePage";

function App() {
  return (
      <Router>
          <section className='app'>
            <header className='app__header'>
              <Header linkList={linkWithRoutes}/>
            </header>
            <main>
              <div>
                <Routes>
                  <Route  path={routePaths.discover} element={<DiscoverPage/>} />
                  <Route path={routePaths.manage} element={<ManagePage/>}/>
                </Routes>
              </div>
            </main>
          </section>
      </Router>
  )

}

export default App;
