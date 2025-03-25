import axios from "axios";
import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";


// componente contexto => comparte los estados por la app
const AuthContext = createContext()

// componente wrapper => envuelve la app y crea los estados
function AuthWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(()=>{
        //cuando un usuario entre por primera vez a la app, valida el token
        authenticateUser()
    }, [])

    async function authenticateUser(){
        // enviar el token al backend, validarlo y recibir la informacion del usuario dueño del token

        try {
            //const authToken = localStorage.getItem("authToken")

            const response = await service.get(`/auth/verify`) //va con el token configurado en el service

            console.log(response) //payload
            // si la llamada llega aeste punto sigifica que el usuario fue correctamente validado
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setUserRole(response.data.payload.role)
            setIsAuthenticatingUser(false)
        } catch (error) {
            // si la llamada entra en el catch, significa que el usuario no pudo ser validado
            console.log(error)
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setUserRole(null)
            setIsAuthenticatingUser(false)
        }
    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        authenticateUser
    }

    if(isAuthenticatingUser === true){
        return <h3>...validando usuario</h3>
    }

    return(
        <AuthContext.Provider value={passedContext}>
        {props.children}
        </AuthContext.Provider>
    )
        
}

export {
    AuthWrapper,
    AuthContext
}