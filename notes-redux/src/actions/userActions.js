import axios from 'axios'

export const ERROR = 'ERROR'
export const SIGN_UP = 'SIGN_UP'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const GET_ACCOUNT = 'GET_ACCOUNT'

const serverErrors = (err) => {
    return { type: ERROR, payload: err }
}


//sign-up
export const startSignup = (formData, props, handleResetToggle) => {
    return (dispatch, getState) => {

        axios.post('http://localhost:3050/users/signup', formData)
            .then((response) => {

                const result = response.data
                if (result.errors) {
                    dispatch(serverErrors(result))
                } else {
                    alert('Sign up success')
                    handleResetToggle()
                    props.history.push('/users/login')
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

//login
export const userLoggedIn = () => {
    return { type: LOG_IN }
}

export const startLogin = (formData, props, handleResetToggle) => {
    return (dispatch, getState) => {

        axios.post('http://localhost:3050/users/login', formData)
            .then((response) => {
                const result = response.data

                if (result.errors) {
                    dispatch(serverErrors(result))
                } else {
                    alert('Login success')
                    handleResetToggle()
                    localStorage.setItem('token', result.token)
                    dispatch(userLoggedIn())
                    props.history.push('/user/notes')
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

//logout
export const userLoggedOut = () => {
    return { type: LOG_OUT }
}

//account

const getAccount = (accountData) => {
    return { type: GET_ACCOUNT, payload: accountData }
}

export const startGetAccount = () => {
    return (
        (dispatch, getState) => {
            axios.get('http://localhost:3050/users/account', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        alert('see console for erros')
                        console.log(result)
                    } else {
                        dispatch(getAccount(result))
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    )
}