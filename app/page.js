// pages/index.js
'use client'
import { useState, useEffect } from "react";
import HighChart from "@/components/HighChart";
import StockSelector from "@/components/StockSelector";

const Home = () => {
  //STATE - Selected Stock
  const [stock,setStock] = useState('');
  const handleStock = (s) =>{
    setStock(s)
  }
  //STATE - Stock Data
  const [stockData,setStockData] = useState([]);
  useEffect(()=>{
    const getPrice = async() =>{
        try{
        const fetchPrice = await fetch(`/api/stock-price?code=${stock}`)
        const jsonPrice = await fetchPrice.json()
        setStockData(jsonPrice)
        setDataMounted(true)
        }catch(error){
          console.error('Error fetching stock price:', error)
        }
    }
    getPrice()
  },[stock])
  //STATE - Stock Data Loading
  const [dataMounted,setDataMounted] = useState(false)
  return (
    <div>
      <h1>Simple Stock Chart</h1>
      <StockSelector
        onSelect={handleStock}
      />
      { !dataMounted ? (<div>Stock Chart</div>):(
        <Highcharts data={stockData[1]}/>
      )}
    </div>
  );
};

export default Home;