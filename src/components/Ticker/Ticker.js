import React, { useMemo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { IoLogoBitcoin } from "react-icons/io";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import numbro from "numbro";

const Ticker = ({ channels }) => {
  console.log("channels", channels);
  const tickerChannelId = useMemo(
    () =>
      Object.keys(channels).find(
        (channelId) => channels[channelId].name === "ticker"
      ),
    [channels]
  );
  console.log(tickerChannelId);

  const ticker = channels[tickerChannelId] || {};
  const [
    ,
    ,
    ,
    ,
    DAILY_CHANGE,
    DAILY_CHANGE_PERC,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW,
  ] = ticker.data || [];

  const dailyChange = useMemo(
    () => numbro(Math.abs(DAILY_CHANGE)).format({ mantissa: 2 }),
    [DAILY_CHANGE]
  );

  const dailyChangePerc = useMemo(
    () =>
      numbro(Math.abs(DAILY_CHANGE_PERC)).format({
        output: "percent",
        mantissa: 2,
      }),
    [DAILY_CHANGE_PERC]
  );

  const lastPrice = useMemo(
    () => numbro(LAST_PRICE).format({ thousandSeparated: true, mantissa: 0 }),
    [LAST_PRICE]
  );

  const volume = useMemo(
    () =>
      numbro(VOLUME * 10000).format({
        thousandSeparated: true,
        mantissa: 0,
      }),
    [VOLUME]
  );

  const low = useMemo(
    () => numbro(LOW).format({ thousandSeparated: true }),
    [LOW]
  );

  const high = useMemo(
    () => numbro(HIGH).format({ thousandSeparated: true }),
    [HIGH]
  );

  return (
    <Container>
      <BitCoinIcon>
        <IoLogoBitcoin />
      </BitCoinIcon>
      <Side>
        <h4>BTC/USD</h4>
        <Line>VOL {volume} USD</Line>
        <Line>Low {low}</Line>
      </Side>

      <Side>
        <h4>LAST PRICE {lastPrice}</h4>
        <Line>
          <span className={dailyChangePerc < 0 ? `red` : "green"}>
            {dailyChange}
            {dailyChange < 0 ? <FaCaretDown /> : <FaCaretUp />}(
            {dailyChangePerc})
          </span>
        </Line>
        <Line>High {high} </Line>
      </Side>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100px;
  padding: 10px;
  background-color: #1b262d;
  border-radius: 15px;
  margin: 15px;
  width: 350px;
  height: 100px;
  color: white;
`;
export const BitCoinIcon = styled.div`
  font-size: 48px;
  width: 60px;
`;
export const Side = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0px 20px;
  h4 {
    font: Bold 16px Arial;
    text-align: center;
    padding: 0px;
    margin: 0px;
  }
  justify-content: center;
  align-items: center;
`;

export const Line = styled.div`
  color: #aaa;
  font: 16px Arial;
  text-align: center;
  font: normal 14px Arial;
  span.red {
    color: #aa6064;
  }
  span.green {
    color: #9a9e93;
  }
`;

export default connect((state) => ({
  channels: state.channel,
}))(Ticker);
