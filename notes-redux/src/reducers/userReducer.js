import { ERROR, GET_ACCOUNT, LOG_IN, LOG_OUT } from "../actions/userActions"

const userInitialState = {
    data: {},
    serverErrors: {},
    loginStatus: false,
    loading: false
}

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case (GET_ACCOUNT): {
            return { ...state, data: { ...action.payload } }
        }
        case (LOG_IN): {
            return { ...state, loginStatus: true }
        }
        case (LOG_OUT): {
            return { ...state, loginStatus: false }
        }
        case (ERROR): {
            return { ...state, serverErrors: { ...action.payload } }
        }
        default: {
            return { ...state }
        }
    }
}

export default userReducer