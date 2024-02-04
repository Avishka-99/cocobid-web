import React, { useEffect, useState } from 'react'
import '../../styles/LandingPage.css';
import '../../styles/SignIn.css'
import ButtonFillInside from '../../components/ButtonFillInside'
import Toast from '../../components/Toast';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import Axios from '../../api/Axios';
import { SetUserAction } from '../../actions/SetUserAction';
import * as ToastMessages from '../../components/ToastMessages';
import { socket } from '../../socket';
export default function LandingPage() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	console.log(localStorage.getItem('type'))
	var user = sessionStorage.getItem('type')
	const showToast = (data) => {
		if (data.type == 'success') {
			ToastMessages.success(data.message);
			ToastMessages.info('Redirecting to OTP verification');
			localStorage.setItem('otpmail', email);
			setIsDisabled(true);
			// setEmail('');
			// setPassword('');
			// // resetFormData();
			// setIsDisabled(true);
			setTimeout(function () {
				navigate('/otp');
			}, 1000);
		} else if (data.type == 'error') {
			ToastMessages.error(data.message);
		} else if (data.type == 'warning') {
			localStorage.setItem('otpmail', email);
			ToastMessages.warning(data.message);
			ToastMessages.info('Redirecting to OTP verification');
			setTimeout(function () {
				navigate('/otp');
			}, 1000);
		}
	};
	const handleSubmit = () => {
		try {
			Axios.post(API_ENDPOINTS.SIGNIN_URL, {
				email: email,
				password: password,
			}).then((response) => {
				//console.log(response.data.id);
				if (response.data.type == 'success') {

					if (response.data.user) {
						dispatch(SetUserAction(response.data.user));
						//dispatch(response.data.id));
						sessionStorage.setItem("user_id", response.data.id)
						socket.connect()
						navigate('/home');
					} else {
						showToast(response.data);
					}
				} else {
					showToast(response.data);
				}
			});
		} catch (e) {
			console.log('e.error');
		}
	}
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/home');
		}
		//console.log("Landing");
	})

	const navigateTo = (page) => {
		if (page == "home") {
			navigate('');
		} else {
			navigate('/' + page);
		}
	}
	return (
		<div className='landingContainer'>
			<div className='header'>
				<div className='companyLogo'>
					C
					<div className='coconut'></div>
					C
					<div className='coconut'></div>
					Bid

				</div>

				<div className='signInsignUp'>
					<ButtonFillInside color={'#274C5B'} text={'Sign Up'} function={navigateTo} textColor={'white'} link={'signup'} />
				</div>
			</div>
			<div className='bodyContainer'>
				<div className='landingLeft'>
					<div className='textLine'>
						Crack the Bid, Get the Bliss: Your <span style={{ color: '#965A3E',fontFamily:'fresh-coconut' }}>Coconut</span> Your Price!
					</div>
					<div className='SignInContainer'>
						<div className='SignInRightContainer'>
							<div className='SignInForm'>

								<input style={{ marginTop: '15%' }} className='signInInput' type='text' autoComplete='off' onChange={(event) => setEmail(event.target.value)} value={email} required></input>
								<label className='placeholder'>Email*</label>
								<input className='signInInput' type='password' onChange={(event) => setPassword(event.target.value)} value={password} required></input>
								<label className='placeholder'>Password*</label>

								<div className='checkBoxAndPswdForget'>
									<div className='row_1'>
										<input type='checkbox' className='checkbox'></input>
										<label className='rememberMe'>Remember me</label>
									</div>
									<div className='row_1'>
										<label className='forgotPassword'>
											Forgot Password?
											<div className='clickHereLink' onClick={() => navigateTo('reset')}>
												{' '}
												Click Here
											</div>
										</label>
									</div>
								</div>
								{isDisabled ? (
									<div className='signInRow'>
										<div className='btn_login'>
											Login
											<div className='arrowCircle'></div>
										</div>
									</div>
								) : (
									<div className='signInRow'>
										<div className='btn_login' onClick={handleSubmit}>
											Login
											<div className='arrowCircle'></div>
										</div>
									</div>
								)}
							</div>
						</div>
						<Toast duration={3000} />
					</div>
				</div>
				<div className='landingRight'>
					<div className='imageContainerOne'>
						<div className='imageContainerTwo'>
							<div className='image'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
