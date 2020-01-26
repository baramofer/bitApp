import React from 'react';
import Header from './cmps/Header'
import './styles/global.scss';
import Router from './Router'

function App() {
  return (
    <div className="App">
       <Header/>
       <Router/>
    </div>
  );
}

export default App;
