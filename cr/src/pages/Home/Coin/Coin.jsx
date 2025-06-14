import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Coin.css';
import { Coincontext } from '../../../context/Coincontext';
import LineChart from '../../../components/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(Coincontext);

  const fetchCoinData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await res.json();
      console.log("Coin Data:", data);
      setCoinData(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  const fetchHistoricalData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Historical Data:", data);
      setHistoricalData(data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
    }
  };

  useEffect(() => {
    if (coinId && currency?.name) {
      fetchCoinData();
      fetchHistoricalData();
    }
  }, [currency, coinId]);

  if (!coinData || !historicalData?.prices) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image?.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol?.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
<div className ="coin-info">
  <ul>
    <li>Crypto Market Rank</li>
    <li>{coinData.market_cap_rank}</li>
  </ul>

    <ul>
    <li>Current Price</li>
    <li>{currency.symbol} {coinData.market_data.current_price [currency.name].toLocaleString()}</li>
  </ul>
    <ul>
    <li>Market cap</li>
    <li>{currency.symbol} {coinData.market_data.market_cap [currency.name].toLocaleString()}</li>
  </ul>
  <ul>
    <li>24 Hour high</li>
    <li>{currency.symbol} {coinData.market_data.high_24h [currency.name].toLocaleString()}</li>
  </ul>
  <ul>
    <li>24 Hour low</li>
    <li>{currency.symbol} {coinData.market_data.low_24h [currency.name].toLocaleString()}</li>
  </ul>
</div>

    </div>
  );
};

export default Coin;
