import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogin } from '../actions/userActions'

const Login = (props) => {

    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (reset) {
            setEmail('')
            setPassword('')
            setReset(false)
        }
    }, [reset])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const handleResetToggle = () => {
        setReset(!reset)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        dispatch(startLogin(formData, props, handleResetToggle))
    }

    return (
        <div className='formControl'>
            <h1>Login</h1>
            {user.serverErrors.errors && <p>{user.serverErrors.errors}</p>}
            <form onSubmit={handleSubmit}>

                <input type="text"
                    value={email}
                    name='email'
                    onChange={handleChange}
                    placeholder='email'
                />
                {user.serverErrors.errors && user.serverErrors.errors.email && <span>{user.serverErrors.errors.email.message}</span>}
                <br />

                <input type="password"
                    value={password}
                    name='password'
                    onChange={handleChange}
                    placeholder='password'
                />
                {user.serverErrors.errors && user.serverErrors.errors.password && <span>{user.serverErrors.errors.password.message}</span>}
                <br />

                <input type="submit" value='Login' />
            </form>
        </div>
    )
}

export default Login