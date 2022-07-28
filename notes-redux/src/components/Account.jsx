import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAccount } from '../actions/userActions'

const Account = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAccount())
    }, [dispatch])

    const user = useSelector((state) => {
        return state.user.data
    })

    return (
        <div>
            <h1>Account details</h1>

            {(Object.keys(user).length > 0) && (

                Object.keys(user).map((ele, i) => {
                    return (
                        <h3 key={i}> {ele} : {user[ele]} </h3>
                    )
                })
            )}
        </div>
    )
}

export default Account