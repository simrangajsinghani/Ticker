import { SET_CHANNEL, SAVE_TICKER } from "../action_type";

const initialState = {
  channel: {},
};

export default function ws(state = initialState, action) {
  switch (action.type) {
    case SET_CHANNEL: {
      const { channel, chanId } = action.payload;
      return {
        ...state,
        channel: {
          ...state.channel,
          [chanId]: {
            name: channel,
            data: [],
          },
        },
      };
    }

    case SAVE_TICKER: {
      const { channelId, data } = action.payload;
      return {
        ...state,
        channel: {
          ...state.channel,
          [channelId]: {
            ...state.channel[channelId],
            data,
          },
        },
      };
    }

    default:
      return state;
  }
}
