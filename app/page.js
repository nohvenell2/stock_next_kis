// pages/index.js
'use client'
import { useState, useEffect } from "react";
import HighChart from "@/components/HighChart";
import TopBar from "@/components/TopBar";
import StockInfo from "@/components/StockInfo";

const Home = () => {
  //STATE - Selected Stock
  const [stock,setStock] = useState('');
  const handleStock = (s) => setStock(s)
  //STATE - Selected Period
  const [period,setPeriod] = useState('D');
  const handlePeriod = (p) => setPeriod(p)
  //STATE - Fetch dbData
  const [data,setData] = useState([]);
  useEffect(()=>{
    const getData = async()=>{
      if (!stock) return
      const fetchData = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/stock-price?code=${stock}&period=${period}`)
      const jsonData = await fetchData.json()
      setData(jsonData)
    }
    getData()
  }
  ,[stock,period])
  //RENDER
  return (
    <div>
      <TopBar onChangeStock={handleStock} onChangePeriod={handlePeriod}/>
      <div className='flex w-full gap-5 mt-24'>
        <div className="flex-grow min-w-0">
          <HighChart data={data}/>
        </div>
        <div className="flex-shrink-0 pr-3 basis-1/4 min-w-[300px] max-w-[350px]">
          <StockInfo data={data[0]}/>
        </div>
      </div>
    </div>
  );
};

export default Home;