import { Route } from "react-router-dom"
import Account from "./components/Account"
import Home from "./components/Home"
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import NotesContainer from "./components/Notes/NotesContainer"
import Signup from "./components/Signup"
import PrivateRoute from "./helper/PrivateRoute"

import './App.css'

const App = (props) => {

    return (
        <div>
            <div>
                <NavBar />
            </div>

            <Route path='/' component={Home} exact={true} />
            <Route path='/users/signup' component={Signup} />
            <Route path='/users/login' component={Login} />

            <PrivateRoute path='/user/account' component={Account} />
            <PrivateRoute path='/user/notes' component={NotesContainer} />
        </div>
    )
}

export default App