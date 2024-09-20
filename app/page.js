// pages/index.js
'use client'
import { useState, useEffect } from "react";
import HighChart from "@/components/HighChart";
import StockSelector from "@/components/StockSelector";
import TopBar from "@/components/TopBar";

const Home = () => {
  //STATE - Selected Stock
  const [stock,setStock] = useState('');
  const handleStock = (s) =>{
    setStock(s)
  }
  return (
    <div>
      <TopBar/>
      <div style={{ marginTop:'70px'}}>
      <StockSelector
        onSelect={handleStock}
      />
      </div>
      <div className='w-9/12'>
        <HighChart stockCode={stock}/>
      </div>
    </div>
  );
};

export default Home;