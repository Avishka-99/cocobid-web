// this is the sign in page
import React, { useState, useEffect } from 'react'
import '../../styles/Resetpassword.css'
import { json, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SetUserAction } from '../../actions/SetUserAction';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import googleiMG from '../../assets/icons/google.png';
import facebookiMG from '../../assets/icons/facebook.png'
//import Axios from 'axios';
export default function ResetPassword() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email)
    var user = localStorage.getItem('type')
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
        //console.log("Landing");
    }, [])
    const navigateTo = (page) => {
        if (page == "home") {
            navigate('');
        } else if (page == "otp") {
            if (email) {
                localStorage.setItem('otpemail', email);
                navigate('/otp');
            }


        }
        else {

            navigate('/' + page);
        }
    }
    const handleSubmit = (e) => {
        Axios.post(API_ENDPOINTS.SIGNIN_URL, {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.type) {
                dispatch(SetUserAction(response.data.type));
                localStorage.setItem('token', response.data.token);
                navigate('/home');
                //window.location.reload(true);
            } else {
                return
            }
            //console.log(response.data);
        });
        //e.preventDefault();
        //console.log(e.target[0].value);


    }
    return (
        <div className='ResetContainer'>
            <div className='ResetleftContainer'></div>
            <div className='ResetRightContainer'>
                <div className='ResetForm'>
                    <div className='Slogan'>Reset, Reconnect, Renew</div>
                    <div className='Logintitle'>Reset Your Password</div>
                    <div className='resetDescription'>Please enter the email address used to register your account,</div>
                    <div className='resetDescription'>and we will email you an OTP to reset password.</div>
                    <input style={{ marginTop: "15%" }} className='ResetInput' type="text" autoComplete="off" onChange={(event) => setEmail(event.target.value)} required></input>
                    <div>Not a member? <span className='resetToSignup' style={{
                        color:'#274C5B',
                        textDecoration:'underline'
                    }} onClick={()=>navigateTo("signup")}>Sign up</span></div>
                    <label className='placeholder_reset'>Email*</label>

                    <div className='ResetRow'>
                        <div className='btn_login' onClick={() => navigateTo("otp")}>
                            Get OTP
                            <div className='arrowCircle'></div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}
