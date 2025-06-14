import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      const dataCopy = [["Date", "Price"]];
      historicalData.prices.forEach(item => {
        const date = new Date(item[0]).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short"
        });
        dataCopy.push([date, item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      legendToggle
    />
  );
};

export default LineChart;
