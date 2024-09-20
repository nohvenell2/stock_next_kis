// pages/index.js
'use client'
import { useState, useEffect } from "react";
import HighChart from "@/components/HighChart";
import TopBar from "@/components/TopBar";

const Home = () => {
  //STATE - Selected Stock
  const [stock,setStock] = useState('');
  const handleStock = (s) => setStock(s)
  const [period,setPeriod] = useState('D');
  const handlePeriod = (p) => setPeriod(p)
  return (
    <div>
      <TopBar onChangeStock={handleStock} onChangePeriod={handlePeriod}/>
      <div className='w-9/12' style={{marginTop:'70px'}}>
        <HighChart stockCode={stock} period={period}/>
      </div>
    </div>
  );
};

export default Home;