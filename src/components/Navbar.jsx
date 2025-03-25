import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const {authenticateUser, isLoggedIn} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async () =>{
    try {
      // removemos el token
      localStorage.removeItem("authToken")

      // removemos todos los estados del contexto
      await authenticateUser()// esto siempre va a fallar porque el token no existe y automaticamente cambia los estados

      // redireccionamos a alguna pagina publica
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {
        /*FORMA SIMILAR ROLES*/
        isLoggedIn === true
        ? 
        <>
        <Link to="/private-page-example">Ejemplo Privado</Link>
        <Link onClick={handleLogout}>Cerrar sesión</Link>
        </>
        :
        <>
        <Link to="/signup">Registro</Link>
        <Link to="/login">Acceso</Link>
        </>
      }
      
      
    </nav>
  );
}

export default Navbar;
