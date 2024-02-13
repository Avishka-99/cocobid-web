import { SET_USER, SET_AUCTION_IMAGES, SET_AUCTION_DETAILS, SET_BID_DETAILS, SET_MODAL_TYPE } from "../constants/ActionTypes";
const initialState = {
    user: "null",
    auctionImages: '',
    auctionDetails: '',
    bidDetails: '',
    modalType: 'auction'
}

const SetUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            sessionStorage.setItem('type', action.data);
            return {
                //counter:getFromDatabase(),
                //...state,
                user: action.data
            }
        case SET_AUCTION_IMAGES:
            return {
                ...state,
                auctionImages: action.data,
            };
        case SET_AUCTION_DETAILS:
            return {
                ...state,
                auctionDetails: action.data,
            }
        case SET_BID_DETAILS:
            return {
                ...state,
                bidDetails: action.data,
            }
        case SET_MODAL_TYPE:
            return {
                ...state,
                modalType: action.data,
            }
        default: return state
    }

}


export default SetUserReducer;