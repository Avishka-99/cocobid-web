import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../constants/Constants';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import * as ToastMessages from './ToastMessages';
export default function BidDetails() {
    const [bid, setBid] = useState()
    const [price, setPrice] = useState(0)
    const OPTIONS = {}
    const { options } = OPTIONS
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 1000 })])
    const auctionImages = useSelector((state) => state.SetUserReducer.auctionImages)
    const auctionDetails = useSelector((state) => state.SetUserReducer.auctionDetails)
    const bidDetails = useSelector((state) => state.SetUserReducer.bidDetails)
    const closeAuction = (id) => {
        console.log(id)

    }
    const rebid = (id, currentbid) => {
        const userid = sessionStorage.getItem('user_id');
        if (price < currentbid) {
            ToastMessages.error('Please Make Bid Greater Than Current Bid')

        } else {
            Axios.post(API_ENDPOINTS.REBID_URL, {
                userid: userid,
                auctionId: id,
                bid: price,
            }).then((response) => {
                if(response.data.type=='success'){
                    ToastMessages.success('Rebidded Successfully!')
                }
            })
        }


    }
    useEffect(() => {
        Axios.post(API_ENDPOINTS.GET_USER_BID_FOR_AUCTION, {
            userid: sessionStorage.getItem('user_id'),
            auctionId: sessionStorage.getItem('aucid')
        }).then((response) => {
            setBid(response.data.data[0].bid)
        })

    }, [])
    return (
        <>
            <div style={{ height: '40px', fontFamily: 'poppins-semibold', fontSize: '26px' }}>Auction Details</div>
            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {auctionImages && auctionImages.map((item, index) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__number">
                                    <span>{index + 1}</span>
                                </div>
                                <img
                                    className="embla__slide__img"
                                    src={BASE_URL + '/uploads/auction/' + item.img_name}
                                    alt="Your alt text"
                                    style={{
                                        backgroundSize: 'contain'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {auctionDetails && <div style={{
                paddingTop: '30px',
                height: '280px'
            }}>

                <div style={{ height: '40px' }}><span style={{fontFamily:'poppins-medium'}}>Description  :</span><span>{auctionDetails[0].description}</span></div>
                <div style={{ height: '40px' }}><span style={{fontFamily:'poppins-medium'}}>Closing Date :</span><span>{new Date(auctionDetails[0].closingDate).toDateString()}</span></div>
                <div style={{ height: '40px' }}><span style={{fontFamily:'poppins-medium'}}>City  :</span><span>{auctionDetails[0].city}</span></div>
                <div style={{ height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ padding: '8px', backgroundColor: '#274c5b', borderRadius: '8px' }}>
                        <span style={{ color: 'white' }}>Total Bids : </span>
                        <span style={{ color: 'white' }}>{bidDetails && bidDetails[0].total_bids}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: '#274c5b', borderRadius: '8px' }}>
                        <span style={{ color: 'white' }}>Current Bid :</span>
                        <span style={{ color: 'white' }}>{bidDetails && " Rs." + (bidDetails[0].max_bid).toFixed(2)}</span>
                    </div>
                </div>
                <div style={{ height: '40px', marginTop: '6px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#274c5b', borderRadius: '8px' }}>
                        <span style={{ color: 'white' }}>My Bid : </span>
                        <span style={{ color: 'white' }}>{bid && "Rs." + bid.toFixed(2)}</span>
                    </div></div>
                <input style={{
                    width: '100%',
                    height: '45px',
                    outline: '1px solid black',
                    border: 'none',
                    borderRadius: '10px',
                    marginTop: '10px',
                    textAlign: 'right',
                    paddingRight: '10px'
                }} type='number' required placeholder='New Bid (Rs.)' onChange={(event) => setPrice(event.target.value)}></input>
                <div className='uploadBtn' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => rebid(auctionDetails[0].Id, bidDetails[0].max_bid)}>Bid Again</div>
            </div>}

        </>

    )
}
