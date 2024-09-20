// pages/index.js
'use client'
import { useState, useEffect } from "react";
import HighChart from "@/components/HighChart";
import TopBar from "@/components/TopBar";

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
      const fetchData = await fetch(`/api/stock-price?code=${stock}&period=${period}`)
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
      <div className='w-9/12' style={{marginTop:'70px'}}>
        <HighChart data={data}/>
      </div>
    </div>
  );
};

export default Home;