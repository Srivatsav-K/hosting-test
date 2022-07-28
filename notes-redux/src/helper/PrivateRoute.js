import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return (
                (localStorage.getItem('token')) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/users/login' }} />
                )
            )
        }} />
    )
}

export default PrivateRoute