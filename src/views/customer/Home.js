import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/Customer/Home.css'
import BidCard from '../../components/BidCard';
import DropDown from '../../components/DropDown';
import { useNavigate } from 'react-router-dom';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import Modal from 'react-modal';
function Home() {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [auctions, setAuctions] = useState()
	const [city, setCity] = useState('');
	const [type, setType] = useState(false)
	const changeCity = (value) => {
		setCity(value.value)
	}
	useEffect(() => {
		Axios.get(API_ENDPOINTS.GET_ALL_AUCTIONS + sessionStorage.getItem('user_id')).then((response) => {
			setAuctions(response.data.data)
		})

	}, [])
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			width: '30%',
			height: '80%',
			borderRadius: '15px',
			outline: '3px solid #274c5b'
		},
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
	return (
		<div className='customerhome'>
			<div className='customerhomeheader' style={{ width: '100%', height: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<div style={{ width: '20%' }}>
					<DropDown function={changeCity} />
				</div>
				<div className='resetBtn' style={{ width: '10%', marginLeft: '2%', borderRadius: '8px' }} onClick={() => setCity('')} >Reset</div>

			</div>
			<div className='auctionContainer'>
				{auctions && auctions.map((item) => (
					city != '' ? item.city == city ? <BidCard type='current' data={item} fun={openModal} /> : <></> : <BidCard type='current' data={item} fun={openModal} />

				))}
			</div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			></Modal>

		</div>
	);
}

export default Home;
