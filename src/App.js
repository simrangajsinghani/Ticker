// External Dependencies
import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./App.css";

// Internal Dependencies
import { setChannel, saveTicker } from "./redux/ticker_reducer/action";
import Ticker from "./components/Ticker";

const App = ({ listen, sendMessage, setChannel, saveTicker }) => {
  useEffect(() => {
    let mapChannel = {};

    sendMessage({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD",
    });

    listen((message) => {
      if (message && message.channel) {
        setChannel(message);
        mapChannel = { ...mapChannel, [message.channel]: message.chanId };
        console.log(mapChannel);
      }

      if (Array.isArray(message)) {
        const [channelId, ...data] = message;
        if (mapChannel["ticker"] === channelId && data[0] !== "hb") {
          saveTicker({ channelId, data: data[0] });
        }
      }
    });
  }, [listen, sendMessage, saveTicker, setChannel]);

  return <div className="app">{<Ticker />}</div>;
};

export default connect(
  (state) => ({
    channels: state.channel,
  }),
  (dispatch) => bindActionCreators({ setChannel, saveTicker }, dispatch)
)(App);
