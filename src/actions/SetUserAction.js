import { SET_USER, SET_AUCTION_IMAGES,SET_AUCTION_DETAILS } from "../constants/ActionTypes";
export const SetUserAction = (payload) => {
    return {
        type: SET_USER,
        data: payload
    }
}
export const SetAuctionImages = (payload) => {
    return {
        type: SET_AUCTION_IMAGES,
        data: payload,
    }
}
export const SetAuctionDetails = (payload) =>{
    return {
        type: SET_AUCTION_DETAILS,
        data: payload,
    }
}
