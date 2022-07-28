import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { userLoggedIn, userLoggedOut } from "../actions/userActions"

const NavBar = (props) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(userLoggedIn())
        }
    }, [dispatch])

    const handleLogOut = () => {
        localStorage.clear()
        dispatch(userLoggedOut())
        props.history.push('/')
    }

    return (
        <div className="navbar">
            <h1>My notes app</h1>

            <div className="navbarActions" >
                <Link to='/'>Home</Link>
                {(!user.loginStatus) ? (
                    <React.Fragment>
                        <Link to='/users/signup'>Signup</Link>
                        <Link to='/users/login'>Login</Link>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to='/user/notes'>Notes</Link>
                        <Link to='/user/account'>Account</Link>
                        <Link to='#' onClick={handleLogOut} >Logout</Link>
                    </React.Fragment>
                )}
            </div>

        </div>
    )
}

export default withRouter(NavBar)