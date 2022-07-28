import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSignup } from '../actions/userActions'

const Signup = (props) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (reset) {
            setUsername('')
            setEmail('')
            setPassword('')
            setReset(false)
        }
    }, [reset])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'username') {
            setUsername(value)
        } else if (name === 'email') {
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
            username,
            email,
            password
        }
        dispatch(startSignup(formData, props, handleResetToggle))
    }


    return (
        <div className='formControl'>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={username}
                    name='username'
                    onChange={handleChange}
                    placeholder='username'
                />
                {user.serverErrors.errors && user.serverErrors.errors.username && <span>{user.serverErrors.errors.username.message}</span>}
                <br />

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

                <input type="submit" value='Signup' />
            </form>
        </div>
    )
}

export default Signup