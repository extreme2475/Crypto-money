import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext();

const CoincontextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  const fetchAllCoin = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setAllCoin(data);
      } else {
        console.error("Unexpected API response:", data);
        setAllCoin([]);
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      setAllCoin([]);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency
  };

  return (
    <Coincontext.Provider value={contextValue}>
      {props.children}
    </Coincontext.Provider>
  );
};

export default CoincontextProvider;
