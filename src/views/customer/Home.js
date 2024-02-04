import React, { useEffect, useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { useSelector, useDispatch } from 'react-redux';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { addToCart, incrementCounter } from '../../reducers/SetUserReducer';
import { GoogleMap, LoadScript, Marker, Maps } from '@react-google-maps/api';
import '../../styles/Customer/Home.css'
import BidCard from '../../components/BidCard';
import DropDown from '../../components/DropDown';
import { useNavigate } from 'react-router-dom';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
function Home() {
	const [auctions, setAuctions] = useState()
	const [city, setCity] = useState('');
	const changeCity = (value) => {
		setCity(value.value)
	}
	console.log(city)
	useEffect(() => {
		Axios.get(API_ENDPOINTS.GET_ALL_AUCTIONS + sessionStorage.getItem('user_id')).then((response) => {
			setAuctions(response.data.data)
		})

	}, [])
	return (
		<div className='customerhome'>
			<div className='customerhomeheader' style={{ width: '100%', height: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<div style={{ width: '20%' }}>
					<DropDown function={changeCity} />
				</div>
				<div className='resetBtn' style={{ width: '10%', marginLeft: '2%', borderRadius: '8px' }}onClick={()=>setCity('')} >Reset</div>

			</div>
			<div className='auctionContainer'>
				{auctions && auctions.map((item) => (
					city!=''?item.city==city?<BidCard type='current' data={item} /> :<></>:<BidCard type='current' data={item} /> 

				))}
			</div>

		</div>
	);
}

export default Home;
