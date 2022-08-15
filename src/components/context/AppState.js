import UserContext from "./UserContext";
import { Navigate, useNavigate } from "react-router-dom";

import React, { useState } from 'react'

function AppState(props) {

    const navigate = useNavigate()

    const [name, setName] = useState(undefined)

    const host = "http://localhost:500"

    const UserSignup = async (username, email, password) => {
        const response = await fetch(`${host}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username ,email: email, password: password, regDate: Date.now()})
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.token)
            console.log(json)
        } else {
            console.log(json)
        }
    }

    const UserLogin = async (email, password) => {
        const response = await fetch(`${host}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.token)
            setName(json.foundUser.username)
            console.log(json)
            navigate('/')
        } else {
            console.log(json)
        }
    }

    const UserLogout = () => {
        localStorage.setItem('token', null)
        navigate('/')
    }

  return (
    <UserContext.Provider value={{UserSignup, UserLogin, UserLogout, name}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default AppState