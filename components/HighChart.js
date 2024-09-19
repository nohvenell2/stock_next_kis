'use client'
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts/highstock';
import { useEffect,useState } from 'react';
const HighchartsReact = dynamic(() => import('highcharts-react-official').then(mod => mod.default), { ssr: false });

const HighChart = () => {
  const [data,setData] = useState([]);
  //data fetching
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const main = async()=>{
      const fetchData = await fetch('/api/stock-price?code=035720')
      const rawData = await fetchData.json()
      setData(rawData[1])
      setLoading(false)
    }
    main()
  }
  ,[])
  /*
  const formatting = (d)=>{
    if (d) return d.map(i=>[new Date(i[0]).getTime(),i[1],i[2],i[3],i[4]])

  }*/
  const options = {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Stock Price Candlestick Chart'
    },
    xAxis: {
      type: 'datetime',
      minrange: 30 * 24 * 3600 * 1000,
      //ordinal:true,
    },
    series: [{
      type: 'candlestick',
      name: 'Stock Price',
      data: data,
      tooltip: {
        valueDecimals: 0
      }
    }],
    plotOptions: {
      candlestick: {
        color: 'dodgerblue',
        lineColor: 'blue',
        upColor: 'tomato',
        upLineColor: 'red'
      }
    },
  };
  return (
    loading ? <div>Loading</div> : 
    <div>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'} // Highstock 사용
      options={options}
    />
  </div>
  )
}
export default HighChart;
