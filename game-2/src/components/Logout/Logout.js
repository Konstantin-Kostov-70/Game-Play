import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import * as userServices from '../../services/userServices'

export const Logout = () => {
    const {auth, userLogout} = useContext(AuthContext)
    const navigate = useNavigate()
    const token = auth.token

    useEffect(() => {
        userServices.logoutUser(token)
        userLogout()
        navigate('/')
    })
}

