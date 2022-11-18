import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './views/login/login.js';
import CreateUsersView from './views/createUsers/createUsers';
import Modal from './components/modal';
//import { Example } from './views/login/login.js';

function App() {

  return (

    <div className="App">
      <section className="App-header">
        {/* <Login/> */}
        
        { <CreateUsersView/> }
    
      </section>
    </div>
  );
}

export default App;
