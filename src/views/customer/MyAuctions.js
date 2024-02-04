import React, { useEffect, useState } from 'react'
import '../../styles/Customer/Bids.css';
import { useNavigate } from 'react-router-dom';
import BidCard from '../../components/BidCard';
import Modal from 'react-modal';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import NewAuction from '../../components/NewAuction';
import AuctionDetails from '../../components/AuctionDetails';
export default function MyAuctions() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [auction, setAuction] = useState()
  const [triggerUseEffect, setTrigger] = useState(false);
  const [type, setType] = useState(false)
  const ValuePiece = Date | null;
  useEffect(() => {
    async function fetchData() {
      const auction = await Axios.post(API_ENDPOINTS.GET_AUCTION_DATA_URL, {
        userId: sessionStorage.getItem('user_id'),
      });
      setAuction(auction.data.data);

    }
    fetchData();
  }, [triggerUseEffect]);
  const navigate = useNavigate();
  const navigateTo = (page) => {
    navigate('/' + page);
  };
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
      outline : '3px solid #274c5b'
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
    <div className='customerBids'>
      <BidCard type='new' fun={openModal} />
      {auction && auction.map((item) => (
        <BidCard type='current' data={item} fun={openModal} />
      ))}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modalIsOpen && !type && <NewAuction />}
        {modalIsOpen && type && <AuctionDetails/>}

      </Modal>
    </div>
  );

}
