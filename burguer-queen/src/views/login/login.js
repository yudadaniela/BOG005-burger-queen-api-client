import { useState, useEffect } from 'react';
import { prueba } from '../../functions/requests.js';


function Login() {
   let unaVariable = 'hola'
  console.log(unaVariable)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState({})
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

  const emailHandle = (event)=>{
    console.log(email);
    setEmail(event.target.value)
    //console.log('email',setEmail(event.target.value));
    
  }

  const passwordHandle = (event)=>{
    console.log(password)
    setPassword(event.target.value)
    //console.log('contraseña', setPassword(event.target.value));
    //setPassword(event.target.value)
  }
  const fetchHandle = (event) => {
    event.preventDefault()
    prueba(email, password).then(res => res.json()).then(resJson => {
          setUser(resJson.user)
          setIsLoadingUser(false)
          console.log(resJson);
          unaVariable = 'chao'
          console.log(unaVariable)

          if(resJson.user.role === 'admin'){
            console.log('es administrador');
            // switch (resJson.user.role) {
            //   case 1 'coci':
                
            //     break;

            // case 2 'mesero':
                
            //       break;
              
            // }
          }else{
            console.log('no es administrador ');

          }

        })

        
  }

  // useEffect(() => {
    // prueba().then(res => res.json()).then(resJson => {
    //   setUser(resJson.user)
    //   setIsLoadingUser(false)
      // unaVariable = 'chao'
      // console.log(unaVariable)
    // })
  // }, [])

  // useEffect(() => console.log(user), [user])



  return (
    <section className="login">
      <div>
        <form onSubmit={fetchHandle}>
          <label>Correo</label>
          <input className="inputsLogin"
            type='email'
            placeholder="Introduce Email"
            name="email"
            value={email}
            onChange={emailHandle}
          >
          </input>

          <label>Contraseña</label>
          <input
            className="inputsLogin"
            type='password'
            placeholder="Introduce Contraseña"
            name="password"
            value={password}
            onChange={passwordHandle} 
          >
          </input>
        <button type="submit"> Ingresar </button>
        <p> es el email{email}</p>
        <p> es la contraseña{password}</p>
        </form>
      </div>
    </section>
  );
}
export default Login;


// const Login = () => {
//   let nombre = "Sofia"
//   let newName = "Daniela"
//   let edad = 12
//   let hobbies = [ "comer", "dormir", "leer"]

//   const[name, SetName]= useState(nombre)
//   const cambiarName= (Nuevoname)=>{
//   SetName(Nuevoname)
//   }

//   return (
//     <div>
//       <p> Hola, {name} Bienvenido a burger queen</p>
//       <p> tienes {edad } años</p>
//       <button onClick={e => cambiarName(newName)}>cambiar nombre</button>
//       <div>
//        {/* {hobbies.map( (hobbie, indice) =>{
//         return (<p key={indice}> {hobbie}</p>);
//        })
//        } */}
//       </div>
//     </div>
//   )
// }

// export default Login


