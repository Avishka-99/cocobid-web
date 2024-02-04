import React from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../constants/Constants';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
export default function AuctionDetails() {
    const OPTIONS = {}
    const { options } = OPTIONS
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 1000 })])
    const auctionImages = useSelector((state) => state.SetUserReducer.auctionImages)
    const auctionDetails = useSelector((state) => state.SetUserReducer.auctionDetails)
    const bidDetails = useSelector((state) => state.SetUserReducer.bidDetails)
    console.log(bidDetails)
    console.log(auctionDetails)
    const closeAuction = (id) => {
        console.log(id)

    }
    const cancelAuction = (id) => {
        console.log(id)

    }
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
                <div style={{ height: '40px' }}><span style={{fontFamily:'poppins-medium'}}>Base Bid     :</span><span>Rs.{(auctionDetails[0].basePrice).toFixed(2)}</span></div>
                <div style={{ height: '40px' }}><span style={{fontFamily:'poppins-medium'}}>Closing Date :</span><span>{new Date(auctionDetails[0].closingDate).toDateString()}</span></div>
                <div style={{ height: '40px' }}><span style={{fontFamily:'poppins-medium'}}>City  :</span><span>{auctionDetails[0].city}</span></div>
                <div style={{ height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ padding: '8px', backgroundColor: '#274c5b', borderRadius: '8px' }}>
                        <span style={{ color: 'white' }}>Total Bids : </span>
                        <span style={{ color: 'white' }}>{bidDetails && bidDetails[0].total_bids}</span>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: '#274c5b', borderRadius: '8px' }}>
                        <span style={{ color: 'white' }}>Current Bid :</span>
                        <span style={{ color: 'white' }}>{bidDetails?bidDetails[0].max_bid?" Rs." + (bidDetails[0].max_bid).toFixed(2):"Rs."+(auctionDetails[0].basePrice).toFixed(2):"Rs."+(auctionDetails[0].basePrice).toFixed(2)}</span>
                    </div>
                </div>
                <div className='uploadBtn' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => closeAuction(auctionDetails[0].Id)}>Close Auction</div>
                <div className='cancelBtn' style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => cancelAuction(auctionDetails[0].Id)}>Cancel Auction</div>
            </div>}

        </>

    )
}
