import React, {useState, useEffect} from 'react';
import '../../styles/SignUp.css';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import googleiMG from '../../assets/icons/google.png';
import facebookiMG from '../../assets/icons/facebook.png';
import * as ToastMessages from '../../components/ToastMessages';
import Toast from '../../components/Toast';
export default function SignUp() {
	var user = localStorage.getItem('type');
	const [role, setRole] = useState('customer');
	const [homeNo, setHomeNo] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [nic, setNic] = useState('');
	const [name, setName] = useState('');
	const [firstName, setfirstName] = useState('');
	const [lastName, setlastName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [contactNo, setContactNo] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	// const [isClean, setIsClean] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	});
	const navigateTo = (page) => {
		if (page === 'home') {
			navigate('');
		} else {
			navigate('/' + page);
		}
	};
	const resetFormData = () => {
		setfirstName('');
		setlastName('');
		setEmail('');
		setPassword('');
		setNic('');
		setContactNo('');
		setConfirmPassword('');
	};
	const showToast = (data) => {
		if (data.type == 'success') {
			ToastMessages.success(data.message);
			ToastMessages.info('Redirectiong to OTP verification');
			resetFormData();
			setIsDisabled(true);
			setTimeout(function () {
				navigate('/otp');
			}, 6000);
		} else if (data.type == 'error') {
			ToastMessages.error(data.message);
		}
	};
	const handleSubmit = (e) => {
		localStorage.setItem('otpemail', email);
		var isClean = true;
		if (firstName == '' || lastName == '' || nic == '' || contactNo == '' || email == '') {
			isClean = false;
			ToastMessages.error('Please fill required fields');
		}
		if (firstName.length > 0 && lastName.length > 0 && nic.length > 0 && contactNo.length > 0 && email.length > 0) {
			if (password == '' && confirmpassword == '') {
				isClean = false;
				ToastMessages.warning('Please enter password');
			}
			if (password != confirmpassword) {
				isClean = false;
				ToastMessages.warning('Please check password');
			}
			if (!checkMail()) {
				ToastMessages.error('Please enter valid email');
			}
			const passwordStrength = checkPasswordStrength();
			if (!passwordStrength) {
				isClean = false;
			}
		}

		if (isClean) {
			Axios.post(API_ENDPOINTS.SIGNUP_URL, {
				email: email,
				password: password,
				nic: nic,
				firstName: firstName,
				lastName: lastName,
				contactNo: contactNo,
			}).then((response) => {
				console.log(response.data);
				showToast(response.data);
			});
		}
	};
	const checkPasswordStrength = () => {
		var strength = 0;
		if (password.match(/[a-z]+/)) {
			strength += 1;
		}
		if (password.match(/[A-Z]+/)) {
			strength += 1;
		}
		if (password.match(/[0-9]+/)) {
			strength += 1;
		}
		if (password.match(/[$@#&!]+/)) {
			strength += 1;
		}
		if (password.length < 6 && strength < 4) {
			ToastMessages.error('Password should be atleast 6 characters long');
			ToastMessages.error('Password should contain atleast one lowercase and uppercase letter, a digit , a special character');
			return false;
		} else if (password.length < 6) {
			ToastMessages.error('Password should be atleast 6 characters long');
			return false;
		} else if (strength < 4) {
			ToastMessages.error('Password should contain atleast one lowercase and uppercase letter, a digit , a special character');
			return false;
		} else {
			return true;
		}
	};
	const checkMail = () => {
		var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (email.match(mailformat)) {
			return true;
		} else {
			return false;
		}
	};
	const keyframes = `
    @keyframes expandWidth {
      0% {
        width: 0%;
      }
      100% {
        width: 76%;
      }
    }
  `;
	return (
		<div className='SignUpContainer'>
			<div className='SignUpleftContainer'></div>
			<div className='SignUpRightContainer'>
				<div className='SignUpForm'>
					<div className='Slogan'>Join the <div style={{fontFamily:'fresh-coconut',paddingLeft:'12px',paddingRight:'12px',color:'#965A3E'}}>Coconut</div> Craze</div>
					<div className='Logintitle'>Start Your Bidding Adventure!</div>
					<div className='signUpRow' style={{marginTop: '3%'}}>
						<div className='leftTextBox'>
							<input className='signUpInput' type='text' autoComplete='off' name='firstName' onChange={(event) => setfirstName(event.target.value)} value={firstName} required></input>
							<label className='placeholder_signup'>First Name*</label>
						</div>
						<div className='rightTextBox'>
							<input className='signUpInput' type='text' autoComplete='off' name='lastName' onChange={(event) => setlastName(event.target.value)} value={lastName} required></input>
							<label className='placeholder_signup'>Last Name*</label>
						</div>
					</div>
					<div className='signUpRow'>
						<div className='leftTextBox'>
							<input className='signUpInput' type={'text'} autoComplete='off' name='nic' onChange={(event) => setNic(event.target.value)} value={nic} required></input>
							<label className='placeholder_signup'>NIC*</label>
						</div>
						<div className='rightTextBox'>
							<input className='signUpInput' type={'text'} autoComplete='off' name='contacNo' onChange={(event) => setContactNo(event.target.value)} value={contactNo} required></input>
							<label className='placeholder_signup'>Contact No*</label>
						</div>
					</div>
					<div className='signUpRow' style={{width: '100%'}}>
						<div className='leftTextBox' style={{width: '100%'}}>
							<input className='signUpInput' type={'email'} autoComplete='off' name='email' onChange={(event) => setEmail(event.target.value)} value={email} required></input>
							<label className='placeholder_signup_email'>Email*</label>
						</div>
					</div>
					<div className='signUpRow'>
						<div className='leftTextBox'>
							<input className='signUpInput' type={'password'} autoComplete='off' name='password' onChange={(event) => setPassword(event.target.value)} value={password} required></input>
							<label className='placeholder_signup'>Password*</label>
						</div>
						<div className='rightTextBox'>
							<input className='signUpInput' type={'password'} autoComplete='off' onChange={(event) => setConfirmPassword(event.target.value)} value={confirmpassword} required></input>
							<label className='placeholder_signup'>Confirm Password*</label>
						</div>
					</div>
					<div
						className='signUpRow'
						style={{
							display: 'flex',
							justifyContent: 'center',
							height: '9%',
							alignItems: 'center',
						}}
					>
						{isDisabled ? (
							<div className='btn_signup'>
								Create Account
								<div className='arrowCircle'></div>
							</div>
						) : (
							<div className='btn_signup' onClick={handleSubmit}>
								Create Account
								<div className='arrowCircle'></div>
							</div>
						)}
					</div>
					<div className='signUpRow' style={{display: 'flex', justifyContent: 'center'}}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								// width: '38%',
							}}
						>
							<span style={{fontFamily: 'poppins-regular'}}>Already have an account?</span>
							<span
								className='loginText'
								style={{
									fontFamily: 'poppins-regular',
									color: '#274C5B',
									textDecoration: 'underline',
								}}
								onClick={() => navigateTo('')}
							>
								Log in
							</span>
						</div>
					</div>
				</div>
			</div>
			<Toast duration={3000} />
		</div>
	);
}
