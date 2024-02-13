import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SetAuctionImages, SetAuctionDetails, SetBidDetails } from '../actions/SetUserAction';
import '../styles/components/Bidcard.css';
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function BidCard(props) {
    const dispatch = useDispatch();
    const getAuctionImges = (id) => {
        sessionStorage.setItem('aucid', id);
        Axios.get(API_ENDPOINTS.GET_AUCTION_IMAGES_URL + id).then((response) => {
            dispatch(SetAuctionImages(response.data.data))
        })
        Axios.get(API_ENDPOINTS.GET_AUCTION_DATA_URL + '/' + id).then((respose) => {
            dispatch(SetAuctionDetails(respose.data.data))
        })
        Axios.get(API_ENDPOINTS.GET_BID_INFO_URL + id).then((response) => {
            console.log(response.data.data)
            dispatch(SetBidDetails(response.data.data))
        })

    }
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00:00");
    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
    const clearTimer = (e) => {
        setTimer("00:00:10");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 40);
        return deadline;
    };
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    if (props.type == 'new') {
        return (
            <div style={{
                width: '32.5%',
                height: 200,
                backgroundColor: '#FFF',
                marginBottom: '1%',
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                outline: '3px solid #274c5b'
            }}
                className='Bidcard'
                onClick={() => props.fun(false)}

            >
                <div style={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'poppins-regular',
                    fontSize: '60px',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                    borderRadius: 60,
                }}>+</div>
            </div>
        )
    } else if (props.type == 'current') {
        const date = new Date(props.data.closingDate);
        const extractedDate = date.toDateString();
        return (
            <div style={{
                width: '32.5%',
                height: 200,
                backgroundColor: '#EEEDEB',
                marginBottom: '1%',
                borderRadius: 15,
                outline: '3px solid #274c5b'

            }}
                className='Bidcard'

            >
                <div style={{
                    width: '100%',
                    height: '25%',
                    padding: '8px'
                }}>
                    {props.data.description}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2%', width: '96%', justifyContent: 'space-between' }}>
                    <div style={{
                        width: '45%',
                        backgroundColor: '#274c5b',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        borderRadius: '10px',
                        color: 'white'
                    }}><AccessTimeIcon sx={{ fontSize: 30, fill: '#FFF' }} />{extractedDate}</div>
                    <div style={{
                        backgroundColor: '#274c5b',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '10px',
                        color: 'white',
                        width: '45%',
                        justifyContent: 'space-evenly',
                    }}><AttachMoneyIcon sx={{ fontSize: 30, fill: '#FFF' }} />Rs.{(props.data.basePrice).toFixed(2)}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2%', width: '96%' }}>
                    <div style={{
                        width: '100%',
                        backgroundColor: '#274c5b',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',

                        borderRadius: '10px',
                        color: 'white',
                        marginTop: '2%'
                    }}><LocationOnIcon sx={{ fontSize: 30, fill: '#FFF' }} />{props.data.city}</div>
                </div>
                {props.data.max_bid && props.data.bid==props.data.max_bid &&
                    <div className='payBtn' style={{ width: '96%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '2%' }} onClick={() => { props.payFunction(true) }}>Pay</div>      
                }
                {   props.data.max_bid && props.data.bid < props.data.max_bid &&
                    <div className='uploadBtn' style={{ width: '96%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '2%' }} onClick={() => { getAuctionImges(props.data.Id); props.fun(true); }}>View</div>
                }


            </div>
        )
    }

}
