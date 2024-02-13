import React, { useState, useEffect } from 'react';
import Axios from '../../api/Axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/Customer/Bids.css';
import * as ToastMessages from '../../components/ToastMessages';
import Toast from '../../components/Toast';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import BidCard from '../../components/BidCard';
import Modal from 'react-modal';
import BidDetails from '../../components/BidDetails';
import Payments from '../../components/Payments';
import { SetModalType } from '../../actions/SetUserAction';
export default function MyBids() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [readyToPay, setReadyToPay] = useState();
	const [type, setType] = useState(false)
	const [bids, setBids] = useState()
	const [triggerUseEffect, setTrigger] = useState(false);
	const modalType = useSelector((state)=>state.SetUserReducer.modalType)
	//var modalType = true;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const navigateTo = (page) => {
		navigate('/' + page);

	};
	const openModal = (type) => {
		setType(true);
		setIsOpen(true);
		modalType = false;
		dispatch(SetModalType('auction'))
	}
	const closeModal = () => {
		setIsOpen(false);
	}
	const afterOpenModal = () => {
		setReadyToPay(false);
	}
	const pay = (data) => {
		setIsOpen(true)
		setReadyToPay(true)
		modalType = true;
		dispatch(SetModalType('payment'))

	}
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: '30%',
			height: '90%',
			borderRadius: '15px',
			outline: '3px solid #274c5b'
		},
	};
	useEffect(() => {
		async function fetchData() {
			Axios.get(API_ENDPOINTS.GET_ALL_USER_BIDS + sessionStorage.getItem('user_id')).then((response) => {
				console.log(response.data.data)
				setBids(response.data.data);
			});


		}
		fetchData();
	}, [triggerUseEffect]);
	return (
		<div className='customerBids'>
			{bids && bids.map((item) => (
				<BidCard type='current' data={item} fun={openModal} payFunction={pay} />
			))}
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				{modalIsOpen && modalType && <Payments />}{modalIsOpen && !modalType && <BidDetails />}
			</Modal>
		</div>
	);
}


