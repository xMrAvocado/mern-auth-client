// Este componente envoltorio protege páginas privadas, solo accesibles por usuarios logeados

import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function OnlyPrivate(props) {

    const {isLoggedIn} = useContext(AuthContext)

    /**FORMA SIMILAR ROLES */
    if(isLoggedIn === true){
        return props.children // si esta logedo, muestra la pagina
    }else{
        //en la base del componente no podemos usar el navigate de useNavigate
        return <Navigate to="/login"/> //si no esta logeado, envialo a hacer login
    }

}

export default OnlyPrivate