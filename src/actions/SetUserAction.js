import { SET_USER, SET_AUCTION_IMAGES, SET_AUCTION_DETAILS, SET_BID_DETAILS, SET_MODAL_TYPE } from "../constants/ActionTypes";
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
export const SetAuctionDetails = (payload) => {
    return {
        type: SET_AUCTION_DETAILS,
        data: payload,
    }
}
export const SetBidDetails = (payload) => {
    return {
        type: SET_BID_DETAILS,
        data: payload,
    }
}
export const SetModalType = (payload) => {
    return {
        type: SET_MODAL_TYPE,
        data: payload
    }
}
