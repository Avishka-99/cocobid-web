import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SetAuctionImages,SetAuctionDetails } from '../actions/SetUserAction';
import '../styles/components/Bidcard.css';
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
export default function BidCard(props) {
    const dispatch = useDispatch();
    const getAuctionImges = (id) => {
        Axios.get(API_ENDPOINTS.GET_AUCTION_IMAGES_URL+id).then((response)=>{
            dispatch(SetAuctionImages(response.data.data))
        })
        Axios.get(API_ENDPOINTS.GET_AUCTION_DATA_URL+'/'+id).then((respose)=>{
            dispatch(SetAuctionDetails(respose.data.data))
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

            }}
                className='Bidcard'
                onClick={() => { getAuctionImges(props.data.Id); props.fun(true); }}
            >
                <div style={{
                    width: '100%',
                    height: 150
                }}>
                    {props.data.description}
                </div>
                <div style={{
                    width: '100%',
                    height: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        width: '30%',
                        backgroundColor: '#274c5b',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '2%',
                        borderRadius: '10px',
                        color: 'white'
                    }}>{extractedDate}</div>
                    <div style={{
                        backgroundColor: '#274c5b',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                        marginRight: '2%',
                        borderRadius: '10px',
                        color: 'white'
                    }}>Base Price - Rs.{(props.data.basePrice).toFixed(2)}</div>
                </div>

            </div>
        )
    }

}
