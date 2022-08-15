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

    const addProduct = async (title, brand, company) => {
        const response = await fetch(`${host}/api/product/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title: title, brand: brand, company: company})
        })
        const json = await response.json()
        if (json.success) {
            alert("Added successfully")
            navigate('/products')
        }
    }

    const displayProducts = async () => {
        const response = await fetch(`${host}/api/product/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        if (json.success) {
            return json.products
        } else {
            return []
        }
    }

    const deleteProduct = async (id) => {
        const response = await fetch(`${host}/api/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            
        })
        const json = await response.json()
        console.log(json)
    }

    const updateProduct = async (id, title, brand, company) => {
        const response = await fetch (`${host}/api/product/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title: title, brand: brand, company: company})
        })
        const json = response.json()
        console.log(json)  
    }

  return (
    <UserContext.Provider value={{UserSignup, UserLogin, UserLogout, name, addProduct, displayProducts, deleteProduct, updateProduct}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default AppState