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
export default function MyBids() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [type, setType] = useState(false)
	const [bids, setBids] = useState()
	const [triggerUseEffect, setTrigger] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const navigateTo = (page) => {
		navigate('/' + page);

	};
	const openModal = (type) => {
		setType(type);
		setIsOpen(true);
	}
	const closeModal = () => {
		setIsOpen(false);
	}
	const afterOpenModal = () => {
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
				<BidCard type='current' data={item} fun={openModal} />
			))}
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				{modalIsOpen && <BidDetails/>}
			</Modal>
		</div>
	);
}


