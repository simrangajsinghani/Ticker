import { SET_CHANNEL, SAVE_TICKER } from "../action_type";

export const setChannel = (payload) => ({ type: SET_CHANNEL, payload });

export const saveTicker = (payload) => ({ type: SAVE_TICKER, payload });
