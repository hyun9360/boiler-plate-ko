import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRouts = null) {
    // option : null (everybody), true (login user), false (not login user)
    // adminRouts : true (only admin)

    const dispatch = useDispatch();

    function AuthenticationCheck(props) {

        useEffect(() => {

            dispatch(auth()).then(response => {

                if(!response.payload.isAuth) { //로그인하지 않은 상태
                    if(option) {
                        props.history.push('/login')
                    }
                } else { // 로그인한 상태
                    if(adminRouts && !response.payload.isAdmin) { // 어드민만 접근 가능한 곳으로 가려고 한다면
                        props.history.push('/')
                    } else {
                        if(!option) { // 로그인 하지 않은 유저만 접근 가능한 곳으로 가려고 한다면
                            props.history.push('/')
                        }
                    }

                }
            })

        }, [])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}