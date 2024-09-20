'use client'
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts/highstock';
const HighchartsReact = dynamic(() => import('highcharts-react-official').then(mod => mod.default), { ssr: false });

const HighChart = ({data}) => {
  const options = {
    chart:{
      height:'60%'
    },
    accessibility:{
      enabled: false
    },
    credits:{
      enabled: false
    },
    rangeSelector: {
      selected: 1
    },
    /*
    title: {
      text: 'Stock Price Candlestick Chart'
    },
    */
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      offset:30
    },
    series: [{
      type: 'candlestick',
      name: 'Stock Price',
      data: data[1],
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
    data.length === 0 ? <div>Select Stock</div> :
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
