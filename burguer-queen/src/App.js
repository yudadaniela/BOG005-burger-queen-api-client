import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const prueba = () => fetch('http://localhost:8080/login', {
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify({
    email: "grace.hopper@systers.xyz",
    password: "123456",
  })
})

function App() {
  let unaVariable = 'hola'
  console.log(unaVariable)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    prueba().then(res => res.json()).then(resJson => { 
      setUser(resJson.user)
      setIsLoadingUser(false)
      unaVariable = 'chao'
      console.log(unaVariable)
    })
  }, [])

  useEffect(() => console.log(user), [user])

  if (isLoadingUser) {
    return <div>Cargando usuaria...</div>
  }

  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {unaVariable} {user.email}
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
